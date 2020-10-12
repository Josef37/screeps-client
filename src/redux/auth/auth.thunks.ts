import axios, { AxiosRequestConfig } from 'axios'
import { AppThunk } from '../store'
import { registerFailure, registerStart, registerSuccess, signinFailure, signinStart, signinSuccess } from './auth.slice'

export const signin = (formData: SigninFormData): AppThunk => async (dispatch, getState) => {
  const { serverUrl, username, password } = formData

  const state = getState()
  if (state.auth.user || state.auth.isLoading) return

  dispatch(signinStart())

  try {
    const token = await signinAndGetToken({ serverUrl, username, password })
    const userData = await getUserData(serverUrl, token)

    dispatch(signinSuccess({ user: userData, token, serverUrl }))
  } catch (error) {
    if (!(error instanceof Error)) throw new Error('Unexpected exception type')
    dispatch(signinFailure(error))
  }
}

export const register = (formData: RegisterFormData): AppThunk => async (dispatch, getState) => {
  const { serverUrl, username, password } = formData

  const state = getState()
  if (state.auth.user || state.auth.isLoading) return

  dispatch(registerStart())

  try {
    await registerUser(formData)
    dispatch(registerSuccess())
    return dispatch(signin({ serverUrl, username, password }))
  } catch (error) {
    if (!(error instanceof Error)) throw new Error('Unexpected exception type')
    dispatch(registerFailure(error))
  }
}

const signinAndGetToken = async (formData: SigninFormData): Promise<string> => {
  const { serverUrl, username, password } = formData

  const res = await getAxiosBackendInstance(serverUrl).post(
    '/api/auth/signin',
    { email: username, password }
  )
  return res.data.token
}

const getUserData = async (serverUrl: string, token: string): Promise<User> => {
  const server = getAxiosBackendInstance(serverUrl, token)
  const { data: userData } = await server.get('/api/auth/me')
  return userData
}

const registerUser = async (formData: RegisterFormData): Promise<void> => {
  const { serverUrl, username, email, password } = formData
  const server = getAxiosBackendInstance(serverUrl)
  const res = await server.post('/api/register/submit', { username, email, password })
  if (!res.data.ok) throw new Error(res.data.error)
}

const getAxiosBackendInstance = (baseURL: string, token?: string) => {
  const config: AxiosRequestConfig = { baseURL, headers: {} }
  if (token) {
    config.headers['X-Token'] = token
    config.headers['X-Username'] = token
  }
  return axios.create(config)
}
