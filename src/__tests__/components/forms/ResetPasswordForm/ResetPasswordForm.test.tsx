import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';

import {
  longPasswordInput,
  notMatchingPasswordInputs,
  shortPasswordInput,
} from '../functions';
import { InputType } from '@/lib/types/tests/forms.type';
import ResetPasswordForm from '@/components/forms/ResetPasswordForm';
import {
  buttonState,
  emptyInputs,
  invalidCodeParam,
  missingCodeParam,
  resetPasswordSuccess,
  setupResetPasswordForm,
  unexpectedError,
} from './resetPasswordFormValidation';
import { IResetPasswordRequest } from '@/lib/types';
import { resetPassword } from '@/tools';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('@/tools', () => ({
  resetPassword: jest.fn(),
}));

jest.mock('notistack', () => ({
  enqueueSnackbar: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();

  (useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
  });

  (useSearchParams as jest.Mock).mockReturnValue({
    get: jest.fn().mockReturnValue('d8582544946f4acc51768b34e'),
  });
});

describe('ResetPasswordForm Rendering', () => {
  const queryClient = new QueryClient();

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <ResetPasswordForm />
      </QueryClientProvider>,
    );

  it('renders the reset-password form fields and submit button', () => {
    renderComponent();

    expect(screen.getByTestId('Password-input')).toBeInTheDocument();
    expect(screen.getByTestId('Confirm Password-input')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Reset Password/i }),
    ).toBeInTheDocument();
  });

  it('renders the submit button with "Reset Password" initially', () => {
    renderComponent();

    const submitButton = screen.getByRole('button', {
      name: /Reset Password/i,
    });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeEnabled();
  });

  it('changes button text to "Loading..." and disables the button when the mutation is pending', async () => {
    await buttonState();

    const submitButton = screen.getByRole('button', {
      name: /Loading.../i,
    });

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });
});

describe('ResetPasswordForm Validation', () => {
  it('shows validation errors when required fields are empty', async () => {
    const errorMessages = await emptyInputs();

    await waitFor(() => {
      expect(errorMessages.passwordError).toHaveTextContent(
        'Password is required',
      );
      expect(errorMessages.confirmPasswordError).toHaveTextContent(
        'Password is required',
      );
    });
  });

  it('shows validation error when password is too short', async () => {
    const form = setupResetPasswordForm();
    const errorMessage = await shortPasswordInput(form, InputType.Password);

    await waitFor(() => {
      expect(errorMessage).toHaveTextContent(
        'Password must be at least 8 characters',
      );
    });
  });

  it('shows validation error when password is too long', async () => {
    const form = setupResetPasswordForm();
    const errorMessage = await longPasswordInput(form, InputType.Password);

    await waitFor(() => {
      expect(errorMessage).toHaveTextContent(
        'Password must be at most 20 characters',
      );
    });
  });

  it('shows validation error when confirm password is too short', async () => {
    const form = setupResetPasswordForm();
    const errorMessage = await shortPasswordInput(
      form,
      InputType.ConfirmPassword,
    );

    await waitFor(() => {
      expect(errorMessage).toHaveTextContent(
        'Password must be at least 8 characters',
      );
    });
  });

  it('shows validation error when confirm password is too long', async () => {
    const form = setupResetPasswordForm();
    const errorMessage = await longPasswordInput(
      form,
      InputType.ConfirmPassword,
    );

    await waitFor(() => {
      expect(errorMessage).toHaveTextContent(
        'Password must be at most 20 characters',
      );
    });
  });

  it('shows validation error when password and confirm password do not match', async () => {
    const form = setupResetPasswordForm();
    const errorMessage = await notMatchingPasswordInputs(form);

    await waitFor(() => {
      expect(errorMessage).toHaveTextContent("Passwords don't match");
    });
  });
});

describe('ResetPasswordForm Success', () => {
  it('shows success notification and redirects user to /auth/sign-in when password reset is successful', async () => {
    const { successMessage } = await resetPasswordSuccess();

    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith(successMessage, {
        variant: 'success',
        autoHideDuration: 10000,
      });
    });

    const router = useRouter();
    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/auth/sign-in');
    });
  });
});

describe('ResetPasswordForm Errors', () => {
  it('throws an error when code param is missing and shows an error notification', async () => {
    const { invalidData, errorMessage } = await missingCodeParam();

    (resetPassword as jest.Mock).mockImplementation(
      (data: IResetPasswordRequest) => {
        if (!data.code) {
          throw new Error(errorMessage);
        }
      },
    );

    expect(() => {
      resetPassword(invalidData);
    }).toThrow(errorMessage);

    await waitFor(() => {
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        autoHideDuration: 10000,
      });
    });
  });

  it('shows an error notification when code param is invalid', async () => {
    const { errorMessage } = await invalidCodeParam();

    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith(errorMessage, {
        variant: 'error',
        autoHideDuration: 10000,
      });
    });
  });

  it('shows an error notification when an unexpected error occurs', async () => {
    const { errorMessage } = await unexpectedError();
    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith(errorMessage, {
        variant: 'error',
        autoHideDuration: 10000,
      });
    });
  });
});
