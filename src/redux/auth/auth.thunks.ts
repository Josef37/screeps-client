import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import { RootState } from "../root.reducer";
import { AppThunk } from "../store";
import { signinFailure, signinStart, signinSuccess } from "./auth.slice";

export const signin = (formData: SigninFormData): AppThunk => async (
  dispatch,
  getState
) => {
  const { serverUrl, username, password } = formData;

  const state = getState() as RootState;
  if (state.auth.user || state.auth.isLoading) return;

  dispatch(signinStart());

  try {
    const token = await signinAndGetToken({ serverUrl, username, password });
    const userData = await getUserData(serverUrl, token);

    dispatch(signinSuccess({ user: userData, token, serverUrl }));
  } catch (error: unknown) {
    if (!(error instanceof Error)) throw new Error("Unexpected exception type");
    dispatch(signinFailure(error));
  }
};

export const register = (formData: RegisterFormData): AppThunk => async (
  dispatch,
  getState
) => {
  const { serverUrl, username, email, password } = formData;
  const server = getAxiosBackendInstance(serverUrl);
};

const getAxiosBackendInstance = (
  baseURL: string,
  token?: string,
  serverPassword?: string
) => {
  const config: AxiosRequestConfig = { baseURL, headers: {} };
  if (token) {
    config.headers["X-Token"] = token;
    config.headers["X-Username"] = token;
  }
  if (serverPassword) {
    config.headers["X-Server-Password"] = serverPassword;
  }
  return axios.create(config);
};

const signinAndGetToken = async (formData: SigninFormData): Promise<string> => {
  const { serverUrl, username, password } = formData;

  const res = await getAxiosBackendInstance(serverUrl).post(
    "/api/auth/signin",
    {
      email: username,
      password,
    }
  );
  return res.data.token;
};

const getUserData = async (serverUrl: string, token: string): Promise<User> => {
  const server = getAxiosBackendInstance(serverUrl, token);
  const { data: userData } = await server.get("/api/auth/me");
  return userData;
};
