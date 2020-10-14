import { getUserData, registerUser, signinAndGetToken } from '../../api/rest'
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
