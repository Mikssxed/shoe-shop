import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { enqueueSnackbar } from 'notistack';

import SignUpForm from '@/components/forms/SignUpForm';
import {
  emailIsAlreadyTaken,
  emptyInputs,
  longNameInput,
  setupSignUpForm,
  shortNameInput,
  signUpSuccess,
} from './signUpFormValidation';
import { setup } from '../setup';
import {
  invalidEmailInput,
  longPasswordInput,
  notMatchingPasswordInputs,
  shortPasswordInput,
} from '../functions';
import { InputType } from '@/lib/types/tests/forms.type';

jest.mock('@/tools', () => ({
  signUp: jest.fn(),
}));

jest.mock('notistack', () => ({
  enqueueSnackbar: jest.fn(),
}));

describe('SignUpForm Rendering', () => {
  const queryClient = new QueryClient();

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <SignUpForm />
      </QueryClientProvider>,
    );

  it('renders the sign-up form fields and submit button', () => {
    renderComponent();

    expect(screen.getByTestId('Name-input')).toBeInTheDocument();
    expect(screen.getByTestId('Email-input')).toBeInTheDocument();
    expect(screen.getByTestId('Password-input')).toBeInTheDocument();
    expect(screen.getByTestId('Confirm Password-input')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Sign Up/i }),
    ).toBeInTheDocument();
  });
});

// TODO: Documentation mentions weak password policies in test part, but it's not required previous parts
// Look into it
describe('SignUpForm Validation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows validation errors when required fields are empty', async () => {
    const errorMessages = await emptyInputs();

    await waitFor(() => {
      expect(errorMessages.nameError).toHaveTextContent('Name is required');
      expect(errorMessages.emailError).toHaveTextContent('Email is required');
      expect(errorMessages.passwordError).toHaveTextContent(
        'Password is required',
      );
      expect(errorMessages.confirmPasswordError).toHaveTextContent(
        'Password is required',
      );
    });
  });

  it('shows validation error when name field is too short', async () => {
    const errorMessage = await shortNameInput();

    await waitFor(() => {
      expect(errorMessage).toHaveTextContent(
        'Name must be at least 2 characters',
      );
    });
  });

  it('shows validation error when name field is too long', async () => {
    const errorMessage = await longNameInput();

    await waitFor(() => {
      expect(errorMessage).toHaveTextContent(
        'Name must be at most 50 characters',
      );
    });
  });

  it('shows validation error when email is invalid', async () => {
    const form = setupSignUpForm();
    const errorMessage = await invalidEmailInput(form);

    await waitFor(() => {
      expect(errorMessage).toHaveTextContent(
        'Invalid email address (ex. johndoe@gmail.com)',
      );
    });
  });

  it('shows validation error when password is too short', async () => {
    const form = setupSignUpForm();
    const errorMessage = await shortPasswordInput(form, InputType.Password);

    await waitFor(() => {
      expect(errorMessage).toHaveTextContent(
        'Password must be at least 8 characters',
      );
    });
  });

  it('shows validation error when password is too long', async () => {
    const form = setupSignUpForm();
    const errorMessage = await longPasswordInput(form, InputType.Password);

    await waitFor(() => {
      expect(errorMessage).toHaveTextContent(
        'Password must be at most 20 characters',
      );
    });
  });

  it('shows validation error when confirm password is too short', async () => {
    const form = setupSignUpForm();
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
    const form = setupSignUpForm();
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
    const form = setupSignUpForm();
    const errorMessage = await notMatchingPasswordInputs(form);

    await waitFor(() => {
      expect(errorMessage).toHaveTextContent("Passwords don't match");
    });
  });

  it('shows error notification when email is already taken', async () => {
    const { errorMessage } = await emailIsAlreadyTaken();

    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith(errorMessage, {
        variant: 'error',
        autoHideDuration: 10000,
      });
    });
  });
});

describe('SignUpForm Success', () => {
  it('shows success message after successful sign up', async () => {
    await signUpSuccess();

    await waitFor(() => {
      expect(
        screen.getByText(
          'Success. Please, check your email inbox and confirm your registration. You can close this tab',
        ),
      ).toBeInTheDocument();
    });
  });
});

describe('SignUpForm Navigation', () => {
  it('redirects user to /auth/sign-in when "Log in" link is clicked', async () => {
    const queryClient = new QueryClient();

    const { user } = setup(
      <QueryClientProvider client={queryClient}>
        <SignUpForm />
      </QueryClientProvider>,
    );
    const loginLink = screen.getByRole('link', { name: /Log in/i });

    await user.click(loginLink);

    expect(loginLink.closest('a')).toHaveAttribute('href', '/auth/sign-in');
  });
});
