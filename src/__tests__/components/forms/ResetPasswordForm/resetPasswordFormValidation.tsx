import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { screen, waitFor } from '@testing-library/react';

import { setup } from '../setup';
import ResetPasswordForm from '@/components/forms/ResetPasswordForm';
import { resetPassword } from '@/tools';
import { IResetPasswordRequest } from '@/lib/types';

export function setupResetPasswordForm() {
  const queryClient = new QueryClient();
  const { user } = setup(
    <QueryClientProvider client={queryClient}>
      <ResetPasswordForm />
    </QueryClientProvider>,
  );
  const userData = {
    password: 'Test1234!',
  };

  const changePasswordInput = async (value: string) =>
    await user.type(screen.getByTestId('Password-input'), value);
  const changeConfirmPasswordInput = async (value: string) =>
    await user.type(screen.getByTestId('Confirm Password-input'), value);
  const submitForm = async () =>
    await user.click(screen.getByRole('button', { name: /Reset Password/i }));

  return {
    ...user,
    userData,
    changePasswordInput,
    changeConfirmPasswordInput,
    submitForm,
  };
}

export async function emptyInputs() {
  const form = setupResetPasswordForm();
  await form.submitForm();

  const errorMessages = await waitFor(() => ({
    passwordError: screen.getByTestId('Password-error'),
    confirmPasswordError: screen.getByTestId('Confirm Password-error'),
  }));

  return errorMessages;
}

export async function resetPasswordSuccess() {
  const successMessage = 'Your password was changed!';

  (resetPassword as jest.Mock).mockResolvedValueOnce({
    message: successMessage,
  });

  const form = setupResetPasswordForm();
  await form.changePasswordInput(form.userData.password);
  await form.changeConfirmPasswordInput(form.userData.password);

  await form.submitForm();

  return { successMessage };
}

export async function missingCodeParam() {
  const errorMessage = `Your link doesn't have the required param "code"`;
  const form = setupResetPasswordForm();

  const invalidData: IResetPasswordRequest = {
    password: form.userData.password,
    passwordConfirmation: form.userData.password,
    code: null,
  };

  await form.changePasswordInput(form.userData.password);
  await form.changeConfirmPasswordInput(form.userData.password);
  await form.submitForm();

  return { invalidData, errorMessage };
}

export async function invalidCodeParam() {
  const errorMessage = 'Incorrect code provided';

  (resetPassword as jest.Mock).mockRejectedValueOnce({ message: errorMessage });

  const form = setupResetPasswordForm();

  await form.changePasswordInput(form.userData.password);
  await form.changeConfirmPasswordInput(form.userData.password);
  await form.submitForm();

  return { errorMessage };
}

export async function unexpectedError() {
  const errorMessage = 'Something went wrong!';

  (resetPassword as jest.Mock).mockRejectedValueOnce({});

  const form = setupResetPasswordForm();
  await form.changePasswordInput(form.userData.password);
  await form.changeConfirmPasswordInput(form.userData.password);
  await form.submitForm();

  return { errorMessage };
}

export async function buttonState() {
  (resetPassword as jest.Mock).mockImplementation(() => new Promise(() => {}));

  const form = setupResetPasswordForm();
  await form.changePasswordInput(form.userData.password);
  await form.changeConfirmPasswordInput(form.userData.password);
  await form.submitForm();
}
