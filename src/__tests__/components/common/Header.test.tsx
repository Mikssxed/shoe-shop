import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { useIsMobile } from '@/hooks';
import { useQueryCartItems } from '@/tools';
import { Header } from '@/components/common';

jest.mock('next-auth/react');
jest.mock('@/hooks');
jest.mock('@/tools');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe('Header Component', () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({ status: 'unauthenticated' });
    (useIsMobile as jest.Mock).mockReturnValue(false);
    (useQueryCartItems as jest.Mock).mockReturnValue({ data: [] });
    (usePathname as jest.Mock).mockReturnValue('/products');

    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      pathname: '/',
    });

    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });

    (require('@/tools').useProductsNames as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });
  });

  it('always rendered logo and bag-icon', () => {
    const { rerender } = render(<Header />);
    expect(screen.getByTestId('header__logo')).toBeInTheDocument();
    expect(screen.getByTestId('header__bagIcon')).toBeInTheDocument();

    (useSession as jest.Mock).mockReturnValue({ status: 'loading' });
    rerender(<Header />);
    expect(screen.getByTestId('header__logo')).toBeInTheDocument();
    expect(screen.getByTestId('header__bagIcon')).toBeInTheDocument();

    (useSession as jest.Mock).mockReturnValue({ status: 'authenticated' });
    rerender(<Header />);
    expect(screen.getByTestId('header__logo')).toBeInTheDocument();
    expect(screen.getByTestId('header__bagIcon')).toBeInTheDocument();

    (useIsMobile as jest.Mock).mockReturnValue(true);
    rerender(<Header />);
    expect(screen.getByTestId('header__logo')).toBeInTheDocument();
    expect(screen.getByTestId('header__bagIcon')).toBeInTheDocument();

    (useQueryCartItems as jest.Mock).mockReturnValue({
      data: [{ amount: 1 }],
    });
    rerender(<Header />);
    expect(screen.getByTestId('header__logo')).toBeInTheDocument();
    expect(screen.getByTestId('header__bagIcon')).toBeInTheDocument();
  });

  it('link to /products renders for desktop only', () => {
    const { rerender } = render(<Header />);

    const productsLink = screen.getByTestId('header__linkToProductsPage');
    expect(productsLink).toBeInTheDocument();
    expect(productsLink.closest('a')).toHaveAttribute('href', '/products');

    (useIsMobile as jest.Mock).mockReturnValue(true);
    rerender(<Header />);
    expect(
      screen.queryByTestId('header__linkToProductsPage'),
    ).not.toBeInTheDocument();
  });

  it('Sign In Button for unauthenticated', () => {
    const { rerender } = render(<Header />);

    const signInButton = screen.getByTestId('header__signInButton');
    expect(signInButton).toBeInTheDocument();
    expect(signInButton.closest('a')).toHaveAttribute('href', '/auth/sign-in');

    (useSession as jest.Mock).mockReturnValue({ status: 'authenticated' });
    rerender(<Header />);
    expect(
      screen.queryByTestId('header__signInButton'),
    ).not.toBeInTheDocument();

    (useIsMobile as jest.Mock).mockReturnValue(true);
    rerender(<Header />);
    expect(
      screen.queryByTestId('header__signInButton'),
    ).not.toBeInTheDocument();

    (useSession as jest.Mock).mockReturnValue({ status: 'unauthenticated' });
    rerender(<Header />);
    expect(screen.getByTestId('header__signInButton')).toBeInTheDocument();
  });

  it('SearchBar exists for desktop only', () => {
    const { rerender } = render(<Header />);
    expect(screen.getByTestId('searchbar')).toBeInTheDocument();

    (useIsMobile as jest.Mock).mockReturnValue(true);
    rerender(<Header />);
    expect(screen.queryByTestId('searchbar')).not.toBeInTheDocument();
  });

  it('Search-icon exists for mobile only', () => {
    const { rerender } = render(<Header />);
    expect(screen.queryByTestId('header__searchIcon')).not.toBeInTheDocument();

    (useIsMobile as jest.Mock).mockReturnValue(true);
    rerender(<Header />);
    expect(screen.getByTestId('header__searchIcon')).toBeInTheDocument();
  });

  it('Not-empty bag-icon state', () => {
    const { rerender } = render(<Header />);
    expect(screen.queryByTestId('header__bagSpan')).not.toBeInTheDocument();

    (useQueryCartItems as jest.Mock).mockReturnValue({
      data: [{ amount: 1 }],
    });
    rerender(<Header />);
    const bagSpanOne = screen.getByTestId('header__bagSpan');
    expect(bagSpanOne).toBeInTheDocument();
    expect(bagSpanOne.innerHTML).toEqual('1');

    (useQueryCartItems as jest.Mock).mockReturnValue({
      data: [{ amount: 5 }, { amount: 15 }, { amount: 30 }],
    });
    rerender(<Header />);
    const bagSpanFifty = screen.getByTestId('header__bagSpan');
    expect(bagSpanFifty).toBeInTheDocument();
    expect(bagSpanFifty.innerHTML).toEqual('50');
  });

  it('Avatar link exist if authed or loading', () => {
    const { rerender } = render(<Header />);
    expect(screen.queryByTestId('header__avatarLink')).not.toBeInTheDocument();

    (useSession as jest.Mock).mockReturnValue({ status: 'loading' });
    rerender(<Header />);
    const loadingAvatarLink = screen.getByTestId('header__avatarLink');
    expect(loadingAvatarLink).toBeInTheDocument();
    expect(loadingAvatarLink.closest('a')).toHaveAttribute(
      'href',
      '/profile/my-products',
    );

    (useSession as jest.Mock).mockReturnValue({ status: 'authenticated' });
    rerender(<Header />);
    const authedAvatarLink = screen.getByTestId('header__avatarLink');
    expect(authedAvatarLink).toBeInTheDocument();
    expect(authedAvatarLink.closest('a')).toHaveAttribute(
      'href',
      '/profile/my-products',
    );
  });

  it('Hamburger exists only for mobile', () => {
    const { rerender } = render(<Header />);
    expect(screen.queryByTestId('header__hamburger')).not.toBeInTheDocument();

    (useIsMobile as jest.Mock).mockReturnValue(true);
    (useSession as jest.Mock).mockReturnValue({ status: 'authenticated' });
    rerender(<Header />);
    expect(screen.getByTestId('header__hamburger')).toBeInTheDocument();
  });

  it('SearchModal opens after click on search', () => {
    render(<Header />);
    expect(screen.queryByTestId('searchModal__content')).not.toBeVisible();

    const searchbarInput = screen.getByTestId('searchbar__input');
    fireEvent.click(searchbarInput);
    expect(screen.getByTestId('searchModal__content')).toBeVisible();
  });

  it('Sidebar opens after click on hamburger', () => {
    (useIsMobile as jest.Mock).mockReturnValue(true);
    (useSession as jest.Mock).mockReturnValue({ status: 'authenticated' });
    render(<Header />);
    expect(screen.queryByTestId('profileSideBar')).not.toBeVisible();

    const hamburger = screen.getByTestId('header__hamburger');
    fireEvent.click(hamburger);
    expect(screen.getByTestId('profileSideBar__content')).toBeVisible();
  });
});
