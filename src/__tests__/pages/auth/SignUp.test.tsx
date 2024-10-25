import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUp from '@/app/auth/sign-up/page';

jest.mock('@/components/forms/SignUpForm', () =>
  jest.fn(() => <div data-testid="sign-up-form" />),
);

describe('SignUp page', () => {
  it('renders the correct heading and text', () => {
    render(<SignUp />);

    const heading = screen.getByRole('heading', { name: /create an account/i });
    expect(heading).toBeInTheDocument();

    const text = screen.getByText(
      /create an account to get an easy access to your dream shopping/i,
    );
    expect(text).toBeInTheDocument();
  });

  it('renders the SignUpForm component', () => {
    render(<SignUp />);

    const form = screen.getByTestId('sign-up-form');
    expect(form).toBeInTheDocument();
  });
});
