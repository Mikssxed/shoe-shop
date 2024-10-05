import ErrorPage from '@/app/error';
import { useIsMobile } from '@/hooks';
import { useQueryCartItems } from '@/tools';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

jest.mock('next-auth/react');
jest.mock('@/hooks');
jest.mock('@/tools');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe('Error Component', () => {
  const mockRouter = {
    back: jest.fn(),
    push: jest.fn(),
  };

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({ status: 'unauthenticated' });
    (useIsMobile as jest.Mock).mockReturnValue(false);
    (useQueryCartItems as jest.Mock).mockReturnValue({ data: [] });
    (usePathname as jest.Mock).mockReturnValue('/products');

    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });

    (require('@/tools').useProductsNames as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });
  });

  const mockReset = jest.fn();
  const mockError = new Error('Test error message');

  it('renders the ServerError component with the correct error message', () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    expect(screen.getByText('Test error message')).toBeInTheDocument();
    expect(screen.getByText('Try again')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('calls the reset function when "Try again" button is clicked', () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    const tryAgainButton = screen.getByText('Try again');
    fireEvent.click(tryAgainButton);
    expect(mockReset).toHaveBeenCalled();
  });

  it('navigates to the homepage when the "Home" link is clicked', () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);

    const homeLink = screen.getByText('Home');
    fireEvent.click(homeLink);
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });
});
