import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../root.reducer";

export const signin = createAsyncThunk(
  "auth/signin",
  async ({
    serverUrl,
    username,
    password,
  }: SigninFormData): Promise<AuthData> => {
    const server = axios.create({ baseURL: serverUrl });

    let { status, data } = await server.post("/api/auth/signin", {
      email: username,
      password,
    });
    if (status !== 200) {
      throw new Error(data);
    }
    const { token } = data;
    server.defaults.headers["X-Token"] = token;
    server.defaults.headers["X-Username"] = token;

    ({ status, data } = await server.get("/api/auth/me"));
    if (status !== 200) {
      throw new Error(data);
    }
    return { user: data, token, serverUrl };
  },
  {
    condition: (_user, { getState }) => {
      const state = getState() as RootState;
      if (state.auth.user || state.auth.isLoading) return false;
    },
  }
);
