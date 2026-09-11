import httpClient from "./httpClient";

import {
  LoginPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  UpdatePasswordPayload,
} from "../types/auth";

export const login = async (payload: LoginPayload) => {
  const response = await httpClient.post("/public/login", payload);

  return response.data;
};

export const forgotPassword = async (payload: ForgotPasswordPayload) => {
  const response = await httpClient.post(
    "/public/send-reset-password-link",
    payload,
  );

  return response.data;
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  const response = await httpClient.post("/public/reset-password", payload);

  return response.data;
};

export const updatePassword = async (payload: UpdatePasswordPayload) => {
  const response = await httpClient.put("/account/update-password", payload);

  return response.data;
};



export const logout = async () => {
  const response = await httpClient.post("/logout");

  return response.data;
};
