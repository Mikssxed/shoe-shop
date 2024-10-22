import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';

import ForgotPassword from '@/app/auth/forgot-password/page';
import { queryClient } from '@/tools';

describe('ForgotPassword Page', () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <ForgotPassword />
      </QueryClientProvider>,
    );
  });

  it('renders Back to log in link', () => {
    expect(
      screen.getByRole('link', { name: /Back to log in/i }),
    ).toBeInTheDocument();
  });

  it('redirects users to /auth/sign-in with Back to log in link', () => {
    const backToLogIn = screen.getByRole('link', { name: /Back to log in/i });

    expect(backToLogIn.closest('a')).toHaveAttribute('href', '/auth/sign-in');
  });
});
