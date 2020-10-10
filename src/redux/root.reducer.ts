import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./auth/auth.slice";

const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
