import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignIn from '@/app/auth/sign-in/page';

jest.mock('@/components/forms/SignInForm', () =>
  jest.fn(() => <div data-testid="sign-in-form" />),
);

describe('SignIn page', () => {
  it('renders the correct heading and text', () => {
    render(<SignIn />);

    const heading = screen.getByRole('heading', { name: /welcome back/i });
    expect(heading).toBeInTheDocument();

    const text = screen.getByText(
      /please enter your details to log into your account/i,
    );
    expect(text).toBeInTheDocument();
  });

  it('renders the SignInForm component', () => {
    render(<SignIn />);

    const form = screen.getByTestId('sign-in-form');
    expect(form).toBeInTheDocument();
  });
});
