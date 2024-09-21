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
