import { IImage } from '@/lib/types';

export interface IUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  phoneNumber: number;
  firstName: string;
  lastName: string;
  avatar?: IImage;
}

export interface IUserRole {
  id: number;
  name: string;
  description: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISignUpResponse extends IUser {
  role: IUserRole;
}

export interface ILogInResponse {
  jwt?: string;
  user?: IUser;
  error?: string;
}

export interface IForgotPasswordRes {
  ok: true;
}

export interface IResetPasswordResponse {
  jwt: string;
  user: IUser;
}
