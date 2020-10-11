import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { signin, register } from './auth.thunks'

const initialState: AuthState = {
  isLoading: false
}

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signout: (state) => {
      delete state.user
    },
    signinStart: fetchStart,
    signinSuccess: (state, action: PayloadAction<AuthData>) => {
      Object.assign(state, action.payload)
      fetchSuccess(state)
    },
    signinFailure: fetchFailure,
    registerStart: fetchStart,
    registerSuccess: fetchSuccess,
    registerFailure: fetchFailure
  }
})

function fetchStart (state: AuthState) {
  state.isLoading = true
  delete state.error
}
function fetchSuccess (state: AuthState) {
  state.isLoading = false
  delete state.error
}
function fetchFailure (state: AuthState, action: PayloadAction<Error>) {
  state.isLoading = false
  state.error = action.payload.message
}

// Export all action creators
export const {
  signout,
  signinStart, signinSuccess, signinFailure,
  registerStart, registerSuccess, registerFailure
} = userSlice.actions
export { signin, register }

// Default export reducer
export default userSlice.reducer
