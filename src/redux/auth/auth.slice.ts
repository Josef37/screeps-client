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
  },
  extraReducers: (builder) => {
    builder.addCase(signin.pending, (state) => {
      state.isLoading = true;
      delete state.error;
    });
    builder.addCase(
      signin.fulfilled,
      (state, action: PayloadAction<AuthData>) => {
        Object.assign(state, action.payload);
        state.isLoading = false;
        delete state.error;
      }
    );
    builder.addCase(signin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

// Export all action creators
export const { signout } = userSlice.actions;
export { signin };

// Default export reducer
export default userSlice.reducer;
