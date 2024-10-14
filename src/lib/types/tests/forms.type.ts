import { setupForgotPasswordForm } from '@/__tests__/components/forms/ForgotPasswordForm/forgotPasswordFormValidation';
import { setupSignUpForm } from '@/__tests__/components/forms/SignUpForm/signUpFormValidation';

export type SignUpFormSetup = ReturnType<typeof setupSignUpForm>;
export type ForgotPasswordFormSetup = ReturnType<
  typeof setupForgotPasswordForm
>;

export type EmailChangeEvent = {
  changeEmailInput: (value: string) => Promise<void>;
  submitForm: () => Promise<void>;
};

export enum InputType {
  Password = 'password',
  ConfirmPassword = 'confirmPassword',
}

export type PasswordChangeEvent = {
  changePasswordInput: (value: string) => Promise<void>;
  changeConfirmPasswordInput?: (value: string) => Promise<void>;
  submitForm: () => Promise<void>;
};

export type MatchingPasswordValidation = Omit<
  PasswordChangeEvent,
  'changeConfirmPasswordInput'
> & {
  changeConfirmPasswordInput: (value: string) => Promise<void>;
  userData: {
    password: string;
  };
};
