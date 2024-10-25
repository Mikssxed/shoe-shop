import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResetPassword from '@/app/auth/reset-password/page';
import { stylingConstants } from '@/lib/constants/themeConstants';

jest.mock('@/components/forms/ResetPasswordForm', () =>
  jest.fn(() => <div data-testid="reset-password-form" />),
);

describe('ResetPassword page', () => {
  it('renders the correct heading and text', () => {
    render(<ResetPassword />);

    const heading = screen.getByRole('heading', { name: /reset password/i });
    expect(heading).toBeInTheDocument();

    const text = screen.getByText(/please create new password here/i);
    expect(text).toBeInTheDocument();
  });

  it('renders the ResetPasswordForm component', () => {
    render(<ResetPassword />);

    const form = screen.getByTestId('reset-password-form');
    expect(form).toBeInTheDocument();
  });

  it('renders the back to login link with correct href and styling', () => {
    render(<ResetPassword />);

    const link = screen.getByRole('link', { name: /back to log in/i });
    expect(link).toHaveAttribute('href', '/auth/sign-in');

    expect(link).toHaveStyle(
      `color: ${stylingConstants.palette.text.secondary}`,
    );
    expect(link).toHaveStyle('text-decoration-line: none');
  });
});
