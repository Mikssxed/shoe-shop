import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { screen, waitFor } from '@testing-library/react';

import { setup } from '../setup';
import SignUpForm from '@/components/forms/SignUpForm';
import { signUp } from '@/tools';

export function setupSignUpForm() {
  const queryClient = new QueryClient();
  const { user } = setup(
    <QueryClientProvider client={queryClient}>
      <SignUpForm />
    </QueryClientProvider>,
  );
  const userData = {
    name: 'John Doe',
    email: 'test@example.com',
    password: 'Test1234!',
  };
  const changeNameInput = async (value: string) =>
    await user.type(screen.getByTestId('Name-input'), value);
  const changeEmailInput = async (value: string) =>
    await user.type(screen.getByTestId('Email-input'), value);
  const changePasswordInput = async (value: string) =>
    await user.type(screen.getByTestId('Password-input'), value);
  const changeConfirmPasswordInput = async (value: string) =>
    await user.type(screen.getByTestId('Confirm Password-input'), value);
  const submitForm = async () =>
    await user.click(screen.getByRole('button', { name: /Sign Up/i }));

  return {
    ...user,
    userData,
    changeNameInput,
    changeEmailInput,
    changePasswordInput,
    changeConfirmPasswordInput,
    submitForm,
  };
}

export async function emptyInputs() {
  const form = setupSignUpForm();
  await form.submitForm();

  const errorMessages = await waitFor(() => ({
    nameError: screen.getByTestId('Name-error'),
    emailError: screen.getByTestId('Email-error'),
    passwordError: screen.getByTestId('Password-error'),
    confirmPasswordError: screen.getByTestId('Confirm Password-error'),
  }));

  return errorMessages;
}

export async function shortNameInput() {
  const form = setupSignUpForm();

  await form.changeNameInput('A');
  await form.submitForm();

  const errorMessage = await waitFor(() => screen.getByTestId('Name-error'));
  return errorMessage;
}

export async function longNameInput() {
  const form = setupSignUpForm();

  const longName = 'A'.repeat(51);
  await form.changeNameInput(longName);
  await form.submitForm();

  const errorMessage = await waitFor(() => screen.getByTestId('Name-error'));
  return errorMessage;
}

export async function shortPasswordInput() {
  const form = setupSignUpForm();

  await form.changePasswordInput('Test');
  await form.submitForm();

  const errorMessage = await waitFor(() =>
    screen.getByTestId('Password-error'),
  );
  return errorMessage;
}

export async function longPasswordInput() {
  const form = setupSignUpForm();

  const longPwd = 't'.repeat(21);
  await form.changePasswordInput(longPwd);
  await form.submitForm();

  const errorMessage = await waitFor(() =>
    screen.getByTestId('Password-error'),
  );
  return errorMessage;
}

export async function shortConfirmPasswordInput() {
  const form = setupSignUpForm();

  await form.changeConfirmPasswordInput('Test');
  await form.submitForm();

  const errorMessage = await waitFor(() =>
    screen.getByTestId('Confirm Password-error'),
  );
  return errorMessage;
}

export async function longConfirmPasswordInput() {
  const form = setupSignUpForm();

  const longPwd = 't'.repeat(21);
  await form.changeConfirmPasswordInput(longPwd);
  await form.submitForm();

  const errorMessage = await waitFor(() =>
    screen.getByTestId('Confirm Password-error'),
  );
  return errorMessage;
}

export async function notMatchingPasswordInputs() {
  const form = setupSignUpForm();

  await form.changePasswordInput(form.userData.password);
  await form.changeConfirmPasswordInput(form.userData.password + '*');
  await form.submitForm();

  const errorMessage = await waitFor(() =>
    screen.getByTestId('Confirm Password-error'),
  );
  return errorMessage;
}

export async function emailIsAlreadyTaken() {
  const errorMessage = 'Email or Username are already taken';

  (signUp as jest.Mock).mockRejectedValueOnce({
    message: errorMessage,
  });

  const form = setupSignUpForm();
  await form.changeNameInput(form.userData.name);
  await form.changeEmailInput(form.userData.email);
  await form.changePasswordInput(form.userData.password);
  await form.changeConfirmPasswordInput(form.userData.password);

  await form.submitForm();

  return { errorMessage };
}

export async function signUpSuccess() {
  (signUp as jest.Mock).mockResolvedValueOnce({});

  const form = setupSignUpForm();
  await form.changeNameInput(form.userData.name);
  await form.changeEmailInput(form.userData.email);
  await form.changePasswordInput(form.userData.password);
  await form.changeConfirmPasswordInput(form.userData.password);

  await form.submitForm();
}
