export interface ILogInRequest {
  identifier: string;
  password: string;
}

export interface ISignUpRequest {
  username: string;
  email: string;
  password: string;
}

export interface IForgotPasswordReq {
  email: string;
}
