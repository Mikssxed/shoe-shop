import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { useIsMobile } from '@/hooks';
import { Header, Search } from '@/components/common';

jest.mock('next-auth/react');
jest.mock('@/hooks');
jest.mock('@/tools');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe('Search Component', () => {
  const onClose = jest.fn();
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({ status: 'unauthenticated' });
    (useIsMobile as jest.Mock).mockReturnValue(false);
    (usePathname as jest.Mock).mockReturnValue('/products');

    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue('Some search'),
    });

    (require('@/tools').useProductsNames as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Renders correctly', () => {
    it('should render search modal with logo, searchbar and cross button', () => {
      render(<Search open={true} onClose={onClose} />);

      expect(screen.getByTestId('searchModal')).toBeInTheDocument();
      expect(screen.getByTestId('searchModal__logo')).toBeInTheDocument();
      expect(screen.getByTestId('searchbar')).toBeInTheDocument();
      expect(screen.getByTestId('searchModal__cross')).toBeInTheDocument();
    });

    it('should render searchbar with icon, input field and buttons', () => {
      render(<Search open={true} onClose={onClose} />);

      expect(screen.getByTestId('searchbar__input')).toBeInTheDocument();
      expect(screen.getByTestId('searchbar__search-icon')).toBeInTheDocument();
      expect(
        screen.getByTestId('searchbar__search-button'),
      ).toBeInTheDocument();
      expect(screen.getByTestId('searchbar__clear-button')).toBeInTheDocument();
    });

    it('should not render logo on mobile view', () => {
      (useIsMobile as jest.Mock).mockReturnValue(true);
      render(<Search open={true} onClose={onClose} />);

      expect(screen.queryByTestId('searchModal__logo')).not.toBeInTheDocument();
    });

    it('should render no results, only 0 search results', () => {
      (require('@/hooks').useDebounce as jest.Mock).mockReturnValue('Nike');
      render(<Search open={true} onClose={onClose} />);

      fireEvent.change(screen.getByPlaceholderText('Search'), {
        target: { value: 'Nike' },
      });

      expect(screen.getByText('0 search results')).toBeInTheDocument();
      expect(
        screen.queryByTestId('search__result-item'),
      ).not.toBeInTheDocument();
    });

    it('should render list of item names after value in input changes', () => {
      (require('@/tools').useProductsNames as jest.Mock).mockReturnValue({
        data: [
          { id: 1, attributes: { name: 'Nike Nike' } },
          { id: 2, attributes: { name: ' Nike Something Dummy boots' } },
        ],
      });

      render(<Search open={true} onClose={onClose} />);

      fireEvent.change(screen.getByPlaceholderText('Search'), {
        target: { value: 'Nike' },
      });

      expect(screen.getByText('Popular Search Terms')).toBeInTheDocument();
      expect(screen.getAllByTestId('search__result-item').length).toBe(2);
    });
  });
  describe('Search works correctly', () => {
    beforeEach(() => {
      (useRouter as jest.Mock).mockReturnValue(mockRouter);
      (require('@/hooks').useDebounce as jest.Mock).mockReturnValue('Nike');
      (require('@/tools').useProductsNames as jest.Mock).mockReturnValue({
        data: [
          { id: 1, attributes: { name: 'Nike Nike' } },
          { id: 2, attributes: { name: ' Nike Something Dummy boots' } },
        ],
      });

      render(<Search open={true} onClose={onClose} />);

      fireEvent.change(screen.getByPlaceholderText('Search'), {
        target: { value: 'Nike' },
      });
    });

    it('should redirect when search is made with search button', () => {
      const searchButton = screen.getByText('Search');
      fireEvent.click(searchButton);
      expect(mockRouter.push).toHaveBeenCalled();
    });

    it('should submit search redirect when pressing enter', () => {
      fireEvent.keyDown(screen.getByPlaceholderText('Search'), {
        key: 'Enter',
      });
      expect(mockRouter.push).toHaveBeenCalled();
    });

    it('should redirect when suggested search is clicked', () => {
      fireEvent.click(screen.getAllByTestId('search__result-item')[0]);
      expect(mockRouter.push).toHaveBeenCalled();
    });

    it('should call push with empty query', () => {
      const spy = jest
        .spyOn(URLSearchParams.prototype, 'delete')
        .mockImplementation(() => 'Nothing');
      fireEvent.click(screen.getByText('Clear'));
      expect(spy).toHaveBeenCalled();
      expect(mockRouter.push).toHaveBeenCalled();
    });

    it('should close the modal', () => {
      fireEvent.click(screen.getByTestId('searchModal__cross'));
      expect(onClose).toHaveBeenCalled();
    });
  });
});
