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
