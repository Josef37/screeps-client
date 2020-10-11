import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signin } from "./auth.thunks";

const initialState: AuthState = {
  isLoading: false,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signout: (state) => {
      delete state.user;
    },
    signinStart: (state) => {
      state.isLoading = true;
      delete state.error;
    },
    signinSuccess: (state, action: PayloadAction<AuthData>) => {
      Object.assign(state, action.payload);
      state.isLoading = false;
      delete state.error;
    },
    signinFailure: (state, action: PayloadAction<Error>) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  },
});

// Export all action creators
export const {
  signout,
  signinStart,
  signinSuccess,
  signinFailure,
} = userSlice.actions;
export { signin };

// Default export reducer
export default userSlice.reducer;

export const register = (inputs: any) => {};
