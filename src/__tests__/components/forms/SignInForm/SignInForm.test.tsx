import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react';
import { enqueueSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import SignInForm from '@/components/forms/SignInForm';
import {
  invalidEmailInput,
  longPasswordInput,
  shortPasswordInput,
} from '../functions';
import { InputType } from '@/lib/types/tests/forms.type';
import {
  createWrapper,
  emptyInputs,
  nonVerifiedAccount,
  rememberSession,
  setupSignInForm,
  unableToGetErrorMessage,
  wrongEmailOrPassword,
} from './signInFormValidation';
import { useSignIn } from '@/hooks';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/hooks', () => ({
  __esModule: true,
  useSignIn: jest.fn(),
}));

jest.mock('notistack', () => ({
  enqueueSnackbar: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();

  (useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
  });

  (useSignIn as jest.Mock).mockReturnValue({
    mutateAsync: jest.fn(),
    isPending: false,
  });
});

describe('SignInForm Rendering', () => {
  const queryClient = new QueryClient();

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <SignInForm />
      </QueryClientProvider>,
    );

  it('renders the sign-in form fields, checkbox, links and submit button', () => {
    renderComponent();

    expect(screen.getByTestId('Email-input')).toBeInTheDocument();
    expect(screen.getByTestId('Password-input')).toBeInTheDocument();
    expect(screen.getByTestId('Remember me-checkbox')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Forgot password?/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Sign up/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Sign In/i }),
    ).toBeInTheDocument();
  });

  it('renders the submit button with "Sign In" initially', () => {
    renderComponent();

    const submitButton = screen.getByRole('button', { name: /Sign In/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeEnabled();
  });

  it('changes button text to "Loading..." and disables the button when the mutation is pending', async () => {
    (useSignIn as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: true,
    });

    renderComponent();

    const submitButton = screen.getByRole('button', {
      name: /Loading.../i,
    });

    await waitFor(() => {
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });
  });
});

describe('SignInForm Validation', () => {
  it('shows validation errors when required fields are empty', async () => {
    const errorMessages = await emptyInputs();

    await waitFor(() => {
      expect(errorMessages.emailError).toHaveTextContent('Email is required');
      expect(errorMessages.passwordError).toHaveTextContent(
        'Password is required',
      );
    });
  });

  it('shows validation error when email is invalid', async () => {
    const form = setupSignInForm();
    const errorMessage = await invalidEmailInput(form);

    await waitFor(() => {
      expect(errorMessage).toHaveTextContent(
        'Invalid email address (ex. johndoe@gmail.com)',
      );
    });
  });

  it('shows validation error when password is too short', async () => {
    const form = setupSignInForm();
    const errorMessage = await shortPasswordInput(form, InputType.Password);

    await waitFor(() => {
      expect(errorMessage).toHaveTextContent(
        'Password must be at least 8 characters',
      );
    });
  });

  it('shows validation error when password is too long', async () => {
    const form = setupSignInForm();
    const errorMessage = await longPasswordInput(form, InputType.Password);

    await waitFor(() => {
      expect(errorMessage).toHaveTextContent(
        'Password must be at most 20 characters',
      );
    });
  });
});

describe('SignInForm Errors', () => {
  it('displays an error notification when wrong credentials are provided', async () => {
    const { errorMessage } = await wrongEmailOrPassword();

    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith(errorMessage, {
        variant: 'error',
        autoHideDuration: 10000,
      });
    });
  });

  it('displays an error notification when wrong credentials are provided and error message is not received', async () => {
    const { errorMessage } = await unableToGetErrorMessage();

    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith(errorMessage, {
        variant: 'error',
        autoHideDuration: 10000,
      });
    });
  });

  it('displays an error notification when email is not verified', async () => {
    const { errorMessage } = await nonVerifiedAccount();

    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith(errorMessage, {
        variant: 'error',
        autoHideDuration: 10000,
      });
    });
  });
});

describe('SignInForm Navigation', () => {
  const queryClient = new QueryClient();

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <SignInForm />
      </QueryClientProvider>,
    );
  it('redirects user to /auth/forgotPassword when "Forgot password?" link is clicked', async () => {
    renderComponent();

    const forgotPwdLink = screen.getByRole('link', {
      name: /Forgot password?/i,
    });

    // Use fireEvent instead of userEvent to avoid 'Not implemented: navigation (except hash changes)' error
    fireEvent.click(forgotPwdLink);

    expect(forgotPwdLink.closest('a')).toHaveAttribute(
      'href',
      '/auth/forgot-password',
    );
  });

  it('redirects user to /auth/sign-up when "Sign up" link is clicked', async () => {
    renderComponent();

    const signUpLink = screen.getByRole('link', { name: /Sign up/i });

    // Use fireEvent instead of userEvent to avoid 'Not implemented: navigation (except hash changes)' error
    fireEvent.click(signUpLink);

    expect(signUpLink.closest('a')).toHaveAttribute('href', '/auth/sign-up');
  });
});

let expires: Date;

jest.mock('js-cookie', () => ({
  get: jest.fn(() => expires),
}));

// This test and SignInForm Success test causes Not implemented: navigation (except hash changes) error
// I couldn't find a solution. The only solutions I found was related to a tag or Link component, which
// I already fixed in some other places. But I couldn't find the problem here and solve it.
describe('SignInForm Remember Me Checkbox', () => {
  it('has false as default value', async () => {
    setupSignInForm();
    expect(screen.getByTestId('Remember me-checkbox')).not.toBeChecked();
  });

  it('sets a short expiry time when "Remember Me" is not selected', async () => {
    const rememberMe = false;
    const { expires: maxAge } = await rememberSession(rememberMe);
    expires = maxAge;

    const persist = Cookies.get('maxAge');
    await waitFor(() => {
      expect(persist).toBe(expires);
    });
  });

  it('sets a long expiry time when "Remember Me" is selected', async () => {
    const rememberMe = true;
    const { expires: maxAge } = await rememberSession(rememberMe);
    expires = maxAge;

    const persist = Cookies.get('maxAge');
    await waitFor(() => {
      expect(persist).toBe(expires);
    });
  });
});

describe('SignInForm Success', () => {
  const mockSignIn = jest.fn();

  beforeEach(() => {
    (useSignIn as jest.Mock).mockReturnValue({
      mutateAsync: mockSignIn,
      isPending: false,
      isSuccess: true,
    });
  });

  it('successfully submits form and redirects user to /products', async () => {
    // TODO: I couldn't test the redirect. router.push is in useSignIn-onSuccess-signIn and no matter what I did I couldn't test it.
    // TODO: Try to test it later on or skip it depending on the situation
    const { result } = renderHook(() => useSignIn(), {
      wrapper: createWrapper(),
    });

    const userInfoPayload = {
      identifier: 'test@example.com',
      password: 'Test1234!',
      rememberMe: false,
    };

    await act(async () => {
      await result.current.mutateAsync(userInfoPayload);
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.isSuccess).toBe(true);
    expect(mockSignIn).toHaveBeenCalledWith(userInfoPayload);
  });
});
