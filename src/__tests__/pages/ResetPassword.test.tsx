import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';

import ResetPassword from '@/app/auth/reset-password/page';
import { queryClient } from '@/tools';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

describe('ResetPassword Page', () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(() => 'mock-code'),
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <ResetPassword />
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
