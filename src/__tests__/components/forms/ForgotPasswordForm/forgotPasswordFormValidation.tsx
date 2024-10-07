import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { screen, waitFor } from '@testing-library/react';

import { setup } from '../setup';
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm';
import { forgotPassword } from '@/tools';

export function setupForgotPasswordForm() {
  const queryClient = new QueryClient();
  const { user } = setup(
    <QueryClientProvider client={queryClient}>
      <ForgotPasswordForm />
    </QueryClientProvider>,
  );
  const email = 'test@example.com';
  const changeEmailInput = async (value: string) =>
    await user.type(screen.getByTestId('Email-input'), value);
  const submitForm = async () =>
    await user.click(screen.getByRole('button', { name: /Reset Password/i }));

  return {
    ...user,
    email,
    changeEmailInput,
    submitForm,
  };
}

export async function emptyInputs() {
  const form = setupForgotPasswordForm();
  await form.submitForm();

  const errorMessage = await waitFor(() => screen.getByTestId('Email-error'));

  return errorMessage;
}

export async function forgotPasswordFormSuccess() {
  (forgotPassword as jest.Mock).mockResolvedValueOnce({});

  const form = setupForgotPasswordForm();
  await form.changeEmailInput(form.email);

  await form.submitForm();
}
