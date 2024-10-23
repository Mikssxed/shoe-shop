// Import external libraries
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';

// Import internal components and hooks
import Products from '@/app/(home)/products/page';
import { Header } from '@/components/common';
import { useIsMobile } from '@/hooks';

// Import utility functions
import {
  IntersectionObserver,
  mockFiltersData,
  mockMaxPrice,
  mockProductData,
} from '@/lib/mocks';
import {
  addToCartQuery,
  getFiltersData,
  getMaxPrice,
  getProducts,
  useProducts,
  useQueryCartItems,
} from '@/tools';

// Set up global IntersectionObserver for the tests
window.IntersectionObserver = IntersectionObserver;
global.IntersectionObserver = IntersectionObserver;

// Mock modules and hooks
jest.mock('@/tools');
jest.mock('next-auth/react');
jest.mock('@/hooks');
jest.mock('next/navigation');
jest.mock('notistack', () => ({ enqueueSnackbar: jest.fn() }));

const queryClient = new QueryClient();

describe('Products Component', () => {
  const mockRouter = {
    push: jest.fn(),
    pathname: '/',
  };

  const mockProduct1 = mockProductData.data[0];
  const mockProduct2 = mockProductData.data[1];

  // Helper function to render the Products component
  const renderProductsPage = async (searchParams = new URLSearchParams()) => {
    const page = await Products({ searchParams });
    render(
      <QueryClientProvider client={queryClient}>{page}</QueryClientProvider>,
    );
  };

  const setupMocks = () => {
    (useSession as jest.Mock).mockReturnValue({ status: 'authenticated' });
    (useIsMobile as jest.Mock).mockReturnValue(false);
    (usePathname as jest.Mock).mockReturnValue('/products');
    (useQueryCartItems as jest.Mock).mockReturnValue({ data: [] });
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    (useProducts as jest.Mock).mockReturnValue({
      data: mockProductData.data,
      isLoading: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
    });
    (require('@/tools').useProductsNames as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (enqueueSnackbar as jest.Mock).mockClear();
    (getFiltersData as jest.Mock).mockResolvedValue(mockFiltersData);
    (getMaxPrice as jest.Mock).mockResolvedValue({
      data: [{ attributes: { price: mockMaxPrice } }],
    });
    setupMocks();
  });

  it('should display product data with name, price, and image', async () => {
    (getProducts as jest.Mock).mockResolvedValue(mockProductData);

    await renderProductsPage();

    // Verify filters and max price are loaded
    await waitFor(() => {
      expect(getFiltersData).toHaveBeenCalled();
      expect(getMaxPrice).toHaveBeenCalled();
      expect(getProducts).toHaveBeenCalled();
    });

    // Check product details: name, price, and image
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    expect(screen.getByText('$500')).toBeInTheDocument();
    expect(screen.getByText('$800')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product 2')).toBeInTheDocument();
  });

  it('should handle empty product list gracefully', async () => {
    (getProducts as jest.Mock).mockResolvedValue({ data: [] });
    (useProducts as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
    });

    await renderProductsPage();

    await waitFor(() => expect(getProducts).toHaveBeenCalled());

    // Assert empty product list message is displayed
    expect(
      screen.getByText("We couldn't find any products"),
    ).toBeInTheDocument();
  });

  it('should return no results when applying filters with no matches', async () => {
    const searchParams = new URLSearchParams({
      sizes: 'XXL',
      color: 'Pinkk',
    });

    (getProducts as jest.Mock).mockResolvedValue({ data: [] });
    (useProducts as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
    });

    await renderProductsPage(searchParams);

    await waitFor(() => expect(getProducts).toHaveBeenCalled());

    // Verify no products message
    expect(
      screen.getByText("We couldn't find any products"),
    ).toBeInTheDocument();
  });

  it('should return multiple results when applying filters that match multiple products', async () => {
    const filteredProducts = {
      data: [mockProduct1, mockProduct2],
    };

    const searchParams = new URLSearchParams({
      brand: 'Nike',
      category: 'Casual',
    });

    (getProducts as jest.Mock).mockResolvedValue(filteredProducts);
    (useProducts as jest.Mock).mockReturnValue({
      data: filteredProducts.data,
      isLoading: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
    });

    await renderProductsPage(searchParams);

    await waitFor(() => expect(getProducts).toHaveBeenCalled());

    // Assert both products are displayed
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
  });

  it('should return partial results when applying filters that match only one product', async () => {
    const filteredProducts = {
      data: [mockProduct1],
    };

    const searchParams = new URLSearchParams({
      size: 'M',
      color: 'Red',
    });

    (getProducts as jest.Mock).mockResolvedValue(filteredProducts);
    (useProducts as jest.Mock).mockReturnValue({
      data: filteredProducts.data,
      isLoading: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
    });

    await renderProductsPage(searchParams);

    await waitFor(() => expect(getProducts).toHaveBeenCalled());

    // Assert only one product is displayed
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Product 2')).not.toBeInTheDocument();
  });

  it('should show and hide filters when the button is clicked', async () => {
    await renderProductsPage();

    // Filters should be hidden initially
    expect(screen.getByTestId('filters-closed')).toBeInTheDocument();

    const toggleButton = screen.getByRole('button', { name: 'Show Filters' });
    fireEvent.click(toggleButton);

    // Filters should now be visible
    expect(screen.getByTestId('filters-open')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Hide Filters' }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Hide Filters' }));

    // Filters should be hidden again
    expect(screen.getByTestId('filters-closed')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Show Filters' }),
    ).toBeInTheDocument();
  });

  it('should display "Filters" text on mobile and toggle behavior works', async () => {
    (useIsMobile as jest.Mock).mockReturnValue(true);

    await renderProductsPage();

    // Filters should be hidden initially
    expect(screen.getByTestId('filters-closed')).toBeInTheDocument();

    const toggleButton = screen.getByRole('button', { name: 'Filters' });
    fireEvent.click(toggleButton);

    // Filters should be visible now
    expect(screen.getByTestId('filters-open')).toBeInTheDocument();

    // Hide filters again
    fireEvent.click(screen.getByTestId('closeFilters'));
    expect(screen.getByTestId('filters-closed')).toBeInTheDocument();
  });

  it('should add product to cart when "Add to Cart" button is clicked', async () => {
    (getProducts as jest.Mock).mockResolvedValue({
      data: [mockProduct1],
    });

    const page = await Products({ searchParams: new URLSearchParams() });
    const { rerender } = render(
      <QueryClientProvider client={queryClient}>
        <Header />
        {page}
      </QueryClientProvider>,
    );

    const addToCartButton = screen.getByTestId('add-to-cart-1');
    fireEvent.click(addToCartButton);

    await waitFor(() => expect(addToCartQuery).toHaveBeenCalled());

    (addToCartQuery as jest.Mock).mockResolvedValue({ data: { amount: 1 } });
    expect(enqueueSnackbar).toHaveBeenCalledWith('Successfully added to cart', {
      variant: 'success',
      autoHideDuration: 2000,
    });

    (useQueryCartItems as jest.Mock).mockReturnValue({
      data: [{ amount: 1 }],
    });

    rerender(<Header />);
    const itemsInCart = screen.getByTestId('header__bagSpan');
    expect(itemsInCart.innerHTML).toEqual('1');
  });
});
