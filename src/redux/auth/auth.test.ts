import authReducer, { registerFailure, registerStart, registerSuccess, signin, signinFailure, signinStart, signinSuccess, signout } from './auth.slice'
import configureMockStore from 'redux-mock-store'
import { expectActionTypes } from '../../utils/test-utils'
import thunk from 'redux-thunk'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { register } from './auth.thunks'

const signInData = {
  serverUrl: 'serverUrl',
  username: 'username',
  password: 'password'
}
const registerData = {
  ...signInData,
  email: 'email'
}
const mockStore = configureMockStore([thunk])
const axiosMock = new MockAdapter(axios)

describe('auth reducer', () => {
  it('should sign out', () => {
    expect(authReducer({ isLoading: false, user: { username: 'test' } }, signout()))
      .toEqual({ isLoading: false })
  })

  it('should set loading state on sign in', () => {
    expect(authReducer({ isLoading: false }, signinStart()))
      .toEqual({ isLoading: true })
  })
})

describe('auth thunks', () => {
  beforeEach(() => axiosMock.reset())

  it('should create a signin rejected action for invalid credentials', () => {
    const store = mockStore({ auth: {} })
    axiosMock.onPost('/api/auth/signin').reply(401, 'Unauthorized')

    return store.dispatch(signin(signInData) as any).then(() => {
      expectActionTypes(store, [signinStart.type, signinFailure.type])
    })
  })

  it('should create a signin fulfilled action for valid credentials', () => {
    const store = mockStore({ auth: {} })
    configureAxiosMockForSuccess()

    return store.dispatch(signin(signInData) as any).then(() => {
      expectActionTypes(store, [signinStart.type, signinSuccess.type])
    })
  })

  it("shouldn't even try when user is already set", () => {
    const store = mockStore({ auth: { user: 'I am root 😈' } })

    return store.dispatch(signin(signInData) as any).then(() => {
      expect(store.getActions()).toHaveLength(0)
    })
  })

  it("shouldn't even try when already fetching", () => {
    const store = mockStore({ auth: { isLoading: true } })

    return store.dispatch(signin(signInData) as any).then(() => {
      expect(store.getActions()).toHaveLength(0)
    })
  })
})

describe('Register thunk', () => {
  beforeEach(() => axiosMock.reset())

  it('should sign the user in on success', () => {
    const store = mockStore({ auth: {} })
    configureAxiosMockForSuccess()

    store.dispatch(register(registerData) as any).then(() => {
      expectActionTypes(
        store,
        [registerStart.type, registerSuccess.type, signinStart.type, signinSuccess.type]
      )
    })
  })

  it('should fail on server error', () => {
    const store = mockStore({ auth: {} })
    const errorMsg = 'There was something wrong...'
    axiosMock.onPost('/api/register/submit').reply(200, { error: errorMsg })

    store.dispatch(register(registerData) as any).then(() => {
      expectActionTypes(store, [registerStart.type, registerFailure.type])
      expect(store.getActions()[1].payload.message).toBe(errorMsg)
    })
  })
})

function configureAxiosMockForSuccess () {
  const token = '1234'
  axiosMock
    .onPost('/api/auth/signin')
    .reply(200, { token })
    .onGet(
      '/api/auth/me',
      undefined,
      expect.objectContaining({
        'X-Token': token,
        'X-Username': token
      })
    )
    .reply(200, { username: 'u', password: true })
    .onPost('/api/register/submit')
    .reply(200, { ok: 1 })
}
