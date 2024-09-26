import { IImage } from '@/lib/types';

export interface ILogInRequest {
  identifier: string;
  password: string;
  rememberMe: boolean;
}

export interface ISignUpRequest {
  username: string;
  email: string;
  password: string;
}

export interface IForgotPasswordReq {
  email: string;
}

export interface IResetPasswordRequest {
  password: string;
  passwordConfirmation: string;
  code: string | null;
}

export interface IUpdateUserRequest {
  id: number;
  jwt: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  avatar?: IImage | null;
}