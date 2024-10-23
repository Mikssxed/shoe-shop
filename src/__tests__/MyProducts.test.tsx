import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

import MyProducts from '@/app/(home)/profile/my-products/page';
import {
  useCreateProduct,
  useDeleteProduct,
  useEditProduct,
  useIsMobile,
} from '@/hooks';
import {
  IntersectionObserver,
  mockProductData,
  mockSessionWithUser,
} from '@/lib/mocks';
import { getMyProducts, useFilters, useProducts } from '@/tools';

// Set up global IntersectionObserver for the tests
window.IntersectionObserver = IntersectionObserver;
global.IntersectionObserver = IntersectionObserver;

jest.mock('@/tools', () => ({
  getMyProducts: jest.fn(),
  useProducts: jest.fn(),
  useFilters: jest.fn(),
  deleteProduct: jest.fn(),
  queryClient: { invalidateQueries: jest.fn(), setQueryData: jest.fn() },
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
jest.mock('ai/react', () => ({
  useChat: jest.fn(() => ({
    messages: [],
    sendMessage: jest.fn(),
    handleInputChange: jest.fn(event => {}), // You can also mock the event here if needed
    handleSubmit: jest.fn(),
    isLoadingChat: false,
  })),
}));

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

const mockCreateProductMutation = {
  mutate: jest.fn(),
  isPending: false,
};

const mockEditProductMutation = {
  mutate: jest.fn(),
  isPending: false,
};
const mockDeleteProduct = jest.fn();
const mockQueryClient = new QueryClient();
mockQueryClient.invalidateQueries = jest.fn();

describe('My Products page and components', () => {
  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      refetch: jest.fn(),
      isPending: false,
    });
    (useCreateProduct as jest.Mock).mockReturnValue(mockCreateProductMutation);
    (useEditProduct as jest.Mock).mockReturnValue(mockEditProductMutation);
    (getServerSession as jest.Mock).mockReturnValue(mockSessionWithUser.data);
    (useSession as jest.Mock).mockReturnValue(mockSessionWithUser);
    (getMyProducts as jest.Mock).mockResolvedValue([]);
    (usePathname as jest.Mock).mockReturnValue('/profile/my-products');
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useFilters as jest.Mock).mockReturnValue({
      sizes: { data: [] },
      categories: { data: [] },
    });
    (useDeleteProduct as jest.Mock).mockReturnValue({
      mutateAsync: mockDeleteProduct,
    });
    (useIsMobile as jest.Mock).mockReturnValue(false);
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

      await waitFor(() => {
        expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByTestId('submit-button')).toBeInTheDocument();
      });

      await userEvent.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(mockDeleteProduct).toHaveBeenCalled();
      });
    });
  });
});
