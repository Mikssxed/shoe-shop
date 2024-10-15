import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { setup } from '../setup';
import SignInForm from '@/components/forms/SignInForm';
import { useSignIn } from '@/hooks';

jest.mock('@/hooks', () => ({
  __esModule: true,
  useSignIn: jest.fn(),
}));

export function setupSignInForm() {
  const queryClient = new QueryClient();
  const { user } = setup(
    <QueryClientProvider client={queryClient}>
      <SignInForm />
    </QueryClientProvider>,
  );
  const userData = {
    email: 'test@example.com',
    password: 'Test1234!',
  };
  const changeEmailInput = async (value: string) =>
    await user.type(screen.getByTestId('Email-input'), value);
  const changePasswordInput = async (value: string) =>
    await user.type(screen.getByTestId('Password-input'), value);
  const checkRememberMeCheckbox = () => {
    fireEvent.click(screen.getByTestId('Remember me-checkbox'));
  };

  const submitForm = async () =>
    await user.click(screen.getByRole('button', { name: /Sign In/i }));

  return {
    ...user,
    userData,
    changeEmailInput,
    changePasswordInput,
    checkRememberMeCheckbox,
    submitForm,
  };
}

export async function emptyInputs() {
  const form = setupSignInForm();
  await form.submitForm();

  const errorMessages = await waitFor(() => ({
    emailError: screen.getByTestId('Email-error'),
    passwordError: screen.getByTestId('Password-error'),
  }));

  return errorMessages;
}

export async function wrongEmailOrPassword() {
  const errorMessage = 'Invalid email or password';

  (useSignIn as jest.Mock).mockReturnValue({
    mutateAsync: jest.fn().mockRejectedValue({
      response: {
        data: {
          error: {
            message: errorMessage,
          },
        },
      },
    }),
    isPending: false,
  });

  const form = setupSignInForm();

  await form.changeEmailInput(form.userData.email);
  await form.changePasswordInput(form.userData.password);
  await form.submitForm();

  return { errorMessage };
}

export async function unableToGetErrorMessage() {
  const errorMessage = 'Wrong credentials';

  (useSignIn as jest.Mock).mockReturnValue({
    mutateAsync: jest.fn().mockRejectedValue({
      response: {},
    }),
    isPending: false,
  });

  const form = setupSignInForm();

  await form.changeEmailInput(form.userData.email);
  await form.changePasswordInput(form.userData.password);
  await form.submitForm();

  return { errorMessage };
}

export async function nonVerifiedAccount() {
  const errorMessage = 'Your account email is not confirmed';

  (useSignIn as jest.Mock).mockReturnValue({
    mutateAsync: jest.fn().mockRejectedValue({
      response: {
        data: {
          error: {
            message: errorMessage,
          },
        },
      },
    }),
    isPending: false,
  });

  const form = setupSignInForm();

  await form.changeEmailInput(form.userData.email);
  await form.changePasswordInput(form.userData.password);
  await form.submitForm();

  return { errorMessage };
}

export async function rememberSession(rememberMe: boolean) {
  const form = setupSignInForm();
  const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
  const expires = new Date(Date.now() + maxAge * 1000);

  await form.changeEmailInput(form.userData.email);
  await form.changePasswordInput(form.userData.password);
  if (rememberMe) {
    form.checkRememberMeCheckbox();
  }

  await form.submitForm();

  return { expires };
}

export function createWrapper() {
  const queryClient = new QueryClient();
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  Wrapper.displayName = 'QueryClientProviderWrapper';
  return Wrapper;
}
