import axios, { AxiosRequestConfig } from 'axios'

export const signinAndGetToken = async ({ serverUrl, username, password }: SigninFormData): Promise<string> => {
  const res = await getAxiosBackendInstance(serverUrl).post(
    '/api/auth/signin',
    { email: username, password }
  )
  return res.data.token
}

export const getUserData = async (serverUrl: string, token: string): Promise<User> => {
  const server = getAxiosBackendInstance(serverUrl, token)
  const { data: userData } = await server.get('/api/auth/me')
  return userData
}

export const registerUser = async ({ serverUrl, username, email, password }: RegisterFormData): Promise<void> => {
  const server = getAxiosBackendInstance(serverUrl)
  const res = await server.post('/api/register/submit', { username, email, password })
  if (!res.data.ok) { throw new Error(res.data.error) }
}

const getAxiosBackendInstance = (baseURL: string, token?: string) => {
  const config: AxiosRequestConfig = { baseURL, headers: {} }
  if (token) {
    config.headers['X-Token'] = token
    config.headers['X-Username'] = token
  }
  return axios.create(config)
}
