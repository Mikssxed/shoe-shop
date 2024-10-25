import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ForgotPassword from '@/app/auth/forgot-password/page';
import { stylingConstants } from '@/lib/constants/themeConstants';

jest.mock('@/components/forms/ForgotPasswordForm', () =>
  jest.fn(() => <div data-testid="forgot-password-form" />),
);

describe('ForgotPassword page', () => {
  it('renders the correct heading and text', () => {
    render(<ForgotPassword />);

    const heading = screen.getByRole('heading', { name: /forgot password\?/i });
    expect(heading).toBeInTheDocument();

    const text = screen.getByText(/we'll send you reset instructions/i);
    expect(text).toBeInTheDocument();
  });

  it('renders the ForgotPasswordForm component', () => {
    render(<ForgotPassword />);

    const form = screen.getByTestId('forgot-password-form');
    expect(form).toBeInTheDocument();
  });

  it('renders the back to login link with correct href and styling', () => {
    render(<ForgotPassword />);

    const link = screen.getByRole('link', { name: /back to log in/i });
    expect(link).toHaveAttribute('href', '/auth/sign-in');

    expect(link).toHaveStyle(
      `color: ${stylingConstants.palette.text.secondary}`,
    );
    expect(link).toHaveStyle('text-decoration-line: none');
  });
});
