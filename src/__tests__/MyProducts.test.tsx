import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';

import MyProducts from '@/app/(home)/profile/my-products/page';
import { mockSessionWithUser, mockProductData } from '@/lib/mocks';
import { getMyProducts, useProducts, useFilters, deleteProduct } from '@/tools';
import { IntersectionObserver } from '@/lib/mocks';

// Set up global IntersectionObserver for the tests
window.IntersectionObserver = IntersectionObserver;
global.IntersectionObserver = IntersectionObserver;

jest.mock('@/tools', () => ({
  getMyProducts: jest.fn(),
  useProducts: jest.fn(),
  useFilters: jest.fn(),
  deleteProduct: jest.fn(),
  queryClient: { invalidateQueries: jest.fn() },
}));
jest.mock('next-auth');
jest.mock('next-auth/react');
jest.mock('@/hooks');
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));
jest.mock('notistack', () => ({ enqueueSnackbar: jest.fn() }));
jest.mock('');
const mockRouter = {
  push: jest.fn(),
};

const mockQueryClient = new QueryClient();
mockQueryClient.invalidateQueries = jest.fn();

describe('My Products page and components', () => {
  beforeEach(() => {
    (getServerSession as jest.Mock).mockReturnValue(mockSessionWithUser.data);
    (useSession as jest.Mock).mockReturnValue(mockSessionWithUser);
    (getMyProducts as jest.Mock).mockResolvedValue([]);
    (usePathname as jest.Mock).mockReturnValue('/profile/my-products');
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useFilters as jest.Mock).mockReturnValue({
      sizes: { data: [] },
      categories: { data: [] },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderMyProductsPage = async () => {
    const page = await MyProducts();
    render(
      <QueryClientProvider client={mockQueryClient}>
        {page}
      </QueryClientProvider>,
    );
  };
  describe('My Products renders correctly', () => {
    it('should render My Products page with products', async () => {
      (useProducts as jest.Mock).mockReturnValue({
        data: mockProductData.data,
        isLoading: false,
        hasNextPage: false,
        fetchNextPage: jest.fn(),
      });
      await renderMyProductsPage();

      expect(
        screen.getByRole('heading', { name: /John Doe/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: /My Products/i }),
      ).toBeInTheDocument();
      expect(screen.getByTestId('profilePicture__image')).toBeInTheDocument();
      expect(screen.getByAltText('My Products Banner')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /Add product/i }),
      ).toBeInTheDocument();
      expect(screen.getAllByTestId('product-card')[0]).toBeInTheDocument();
      expect(screen.getAllByTestId('product-card')[1]).toBeInTheDocument();
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
      expect(
        screen.getAllByTestId('product-card__button-menu')[0],
      ).toBeInTheDocument();
    });

    it('should render empty My Products page with message', async () => {
      (useProducts as jest.Mock).mockReturnValue({
        data: [],
        isLoading: false,
        hasNextPage: false,
        fetchNextPage: jest.fn(),
      });
      await renderMyProductsPage();

      expect(screen.getByTestId('empty-product-list')).toBeInTheDocument();
      expect(
        screen.getByTestId('empty-product-list__picture'),
      ).toBeInTheDocument();
      expect(
        screen.getByText("You don't have any products yet"),
      ).toBeInTheDocument();
      expect(screen.getByText('Add new product')).toBeInTheDocument();
    });
  });
  describe('My Products works correctly', () => {
    beforeEach(() => {
      (useProducts as jest.Mock).mockReturnValue({
        data: [mockProductData.data[0]],
        isLoading: false,
        hasNextPage: false,
        fetchNextPage: jest.fn(),
      });
    });

    it('should redirect to single product page after clicking product card', async () => {
      await renderMyProductsPage();

      expect(
        screen.getByTestId('product-card__link').closest('a'),
      ).toHaveAttribute('href', `/products/${mockProductData.data[0].id}`);
    });

    it('should redirect to single product page after clicking view', async () => {
      await renderMyProductsPage();

      await userEvent.click(screen.getByTestId('product-card__button-menu'));

      expect(screen.getByText('View')).toBeInTheDocument();

      await userEvent.click(screen.getByText('View'));

      expect(mockRouter.push).toHaveBeenCalledWith(
        `/products/${mockProductData.data[0].id}`,
      );
    });

    it('should redirect to add product page', async () => {
      await renderMyProductsPage();
      expect(
        screen.getByTestId('my-products__add-product').closest('a'),
      ).toHaveAttribute('href', '/profile/add-product');
    });

    it('should show edit product modal', async () => {
      await renderMyProductsPage();

      await userEvent.click(screen.getByTestId('product-card__button-menu'));

      const editMenuButton = screen.getByText('Edit');

      expect(editMenuButton).toBeInTheDocument();

      await userEvent.click(editMenuButton);

      expect(screen.getByTestId('edit-product-modal')).toBeInTheDocument();
    });

    it('should show delete product modal', async () => {
      await renderMyProductsPage();

      await userEvent.click(screen.getByTestId('product-card__button-menu'));

      const deleteMenuButton = screen.getByTestId('button-menu__delete');

      expect(deleteMenuButton).toBeInTheDocument();

      await userEvent.click(deleteMenuButton);

      expect(screen.getByTestId('delete-modal')).toBeInTheDocument();

      await userEvent.click(screen.getByTestId('submit-button'));

      expect(deleteProduct).toHaveBeenCalled();
      expect(enqueueSnackbar).toHaveBeenCalledWith(
        `Product "${mockProductData.data[0].attributes.name}" has been deleted.`,
        {
          variant: 'default',
          autoHideDuration: 5000,
        },
      );
    });
  });
});
