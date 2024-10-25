import NotFoundError from '@/app/not-found';
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

describe('NotFoundError Page', () => {
  const mockRouter = {
    back: jest.fn(),
    push: jest.fn(),
  };

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({ status: 'unauthenticated' });
    (useIsMobile as jest.Mock).mockReturnValue(false);
    (useQueryCartItems as jest.Mock).mockReturnValue({ data: [] });
    (usePathname as jest.Mock).mockReturnValue('/productsasssss');

    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });

    (require('@/tools').useProductsNames as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });
  });
  it('renders 404 error message', () => {
    render(<NotFoundError />);

    expect(screen.getByText('Error 404')).toBeInTheDocument();
    expect(
      screen.getByText(
        'It seems that the page you tried to access might not exist anymore. Go back to the previous page or go to the home page.',
      ),
    ).toBeInTheDocument();
  });

  it('calls router.back() when "Go back" button is clicked', () => {
    render(<NotFoundError />);

    const goBackButton = screen.getByText('Go back');

    fireEvent.click(goBackButton);

    expect(mockRouter.back).toHaveBeenCalled();
  });

  it('navigates to the home page when "Home" button is clicked', () => {
    render(<NotFoundError />);

    const homeButton = screen.getByText('Home');

    fireEvent.click(homeButton);

    expect(homeButton.closest('a')).toHaveAttribute('href', '/');
  });

  it('renders mobile or desktop buttons based on isMobile', () => {
    (useIsMobile as jest.Mock).mockReturnValue(true);
    const { rerender } = render(<NotFoundError />);
    expect(screen.getByText('Go back')).toBeInTheDocument();

    (useIsMobile as jest.Mock).mockReturnValue(false);
    rerender(<NotFoundError />);
    expect(screen.getByText('Go back')).toBeInTheDocument();
  });
});
