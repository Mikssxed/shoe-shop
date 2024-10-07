import { EmailChangeEvent } from '@/lib/types/tests/forms.type';
import { screen, waitFor } from '@testing-library/dom';

export async function invalidEmailInput<T extends EmailChangeEvent>(form: T) {
  await form.changeEmailInput('test@ex');
  await form.submitForm();

  const errorMessage = await waitFor(() => screen.getByTestId('Email-error'));
  return errorMessage;
}
