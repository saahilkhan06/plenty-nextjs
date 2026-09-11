// src/types/auth.ts

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}

export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}