import {
  EmailChangeEvent,
  InputType,
  MatchingPasswordValidation,
  PasswordChangeEvent,
} from '@/lib/types/tests/forms.type';
import { screen, waitFor } from '@testing-library/dom';

export async function invalidEmailInput<T extends EmailChangeEvent>(form: T) {
  await form.changeEmailInput('test@ex');
  await form.submitForm();

  const errorMessage = await waitFor(() => screen.getByTestId('Email-error'));
  return errorMessage;
}

export async function shortPasswordInput<T extends PasswordChangeEvent>(
  form: T,
  inputType: InputType,
) {
  if (inputType === InputType.Password) {
    await form.changePasswordInput('Test');
  } else if (inputType === InputType.ConfirmPassword) {
    await form.changeConfirmPasswordInput('Test');
  }

  await form.submitForm();

  const errorMessage = await waitFor(() =>
    screen.getByTestId(
      `${inputType === InputType.Password ? 'Password' : 'Confirm Password'}-error`,
    ),
  );
  return errorMessage;
}

export async function longPasswordInput<T extends PasswordChangeEvent>(
  form: T,
  inputType: InputType,
) {
  const longPwd = 't'.repeat(21);
  if (inputType === InputType.Password) {
    await form.changePasswordInput(longPwd);
  } else if (inputType === InputType.ConfirmPassword) {
    await form.changeConfirmPasswordInput(longPwd);
  }

  await form.submitForm();

  const errorMessage = await waitFor(() =>
    screen.getByTestId(
      `${inputType === InputType.Password ? 'Password' : 'Confirm Password'}-error`,
    ),
  );
  return errorMessage;
}

export async function notMatchingPasswordInputs<
  T extends MatchingPasswordValidation,
>(form: T) {
  await form.changePasswordInput(form.userData.password);
  await form.changeConfirmPasswordInput(form.userData.password + '*');
  await form.submitForm();

  const errorMessage = await waitFor(() =>
    screen.getByTestId('Confirm Password-error'),
  );
  return errorMessage;
}
