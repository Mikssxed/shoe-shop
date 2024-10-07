import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';

import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm';
import {
  emptyInputs,
  forgotPasswordFormSuccess,
  setupForgotPasswordForm,
} from './forgotPasswordFormValidation';
import { invalidEmailInput } from '../functions';

jest.mock('@/tools', () => ({
  forgotPassword: jest.fn(),
}));

describe('ForgotPasswordForm Rendering', () => {
  const queryClient = new QueryClient();

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <ForgotPasswordForm />
      </QueryClientProvider>,
    );

  it('renders the forgot password form fields and submit button', () => {
    renderComponent();

    expect(screen.getByTestId('Email-input')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Reset Password/i }),
    ).toBeInTheDocument();
  });
});

describe('ForgotPasswordForm Validation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows validation errors when required fields are empty', async () => {
    const errorMessage = await emptyInputs();

    expect(errorMessage).toHaveTextContent('Email is required');
  });

  it('shows validation error when email is invalid', async () => {
    const form = setupForgotPasswordForm();
    const errorMessage = await invalidEmailInput(form);

    expect(errorMessage).toHaveTextContent(
      'Invalid email address (ex. johndoe@gmail.com)',
    );
  });
});

describe('ForgotPasswordForm Sucess', () => {
  it('shows success message after sucessful password reset request', async () => {
    await forgotPasswordFormSuccess();

    await waitFor(() => {
      expect(
        screen.getByText('Success. Please, check your email inbox'),
      ).toBeInTheDocument();
    });
  });
});

// TODO: Test 'Back to log in' link. It's not tested here since it's in a different component.
