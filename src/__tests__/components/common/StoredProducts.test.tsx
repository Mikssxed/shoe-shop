import '@testing-library/jest-dom';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { QueryClientProvider } from '@tanstack/react-query';

import { mockProductData, mockSessionAuthed } from '@/lib/mocks';
import StoredProducts from '@/components/common/StoredProducts';
import { queryClient } from '@/tools';
import { getStoredProductIds, isProductWishlisted } from '@/utils';
import * as Functions from '@/utils/storedProductsIds';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));
jest.mock('notistack', () => ({
  enqueueSnackbar: jest.fn(),
}));
jest.mock('@/utils/storedProductsIds', () => ({
  __esModule: true,
  ...jest.requireActual('@/utils/storedProductsIds'),
}));

const emptyWishlistText = "You haven't added any products to your wishlist yet";
const emptyRecentlyViewedText = "You haven't viewed any products yet";
const mockProductList = mockProductData.data;
const mockProduct1 = mockProductData.data[0];
const mockProduct2 = mockProductData.data[1];
const mockUserId = mockSessionAuthed.data.user.id;

describe('StoredProducts Component Rendering', () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue(mockSessionAuthed);
    (usePathname as jest.Mock).mockReturnValue('/profile/my-wishlist');
  });

  it('renders skeletons while loading', () => {
    render(
      <StoredProducts
        products={undefined}
        isLoading={true}
        title="My Wishlist"
        emptyStateText={emptyWishlistText}
      />,
    );

    expect(screen.getByTestId('title__skeleton')).toBeInTheDocument();
    expect(screen.getAllByTestId('product__skeleton')).toHaveLength(12);
  });

  it('renders product list', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <StoredProducts
          products={mockProductList}
          isLoading={false}
          title="My Wishlist"
          emptyStateText={emptyWishlistText}
        />
      </QueryClientProvider>,
    );

    expect(screen.getByText(mockProduct1.attributes.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct2.attributes.name)).toBeInTheDocument();
  });

  it('renders empty product list when there are no products', () => {
    render(
      <StoredProducts
        products={[]}
        isLoading={false}
        title="My Wishlist"
        emptyStateText={emptyWishlistText}
      />,
    );

    expect(screen.getByText(emptyWishlistText)).toBeInTheDocument();
  });
});

describe('StoreProducts Component Handle Wishlist', () => {
  jest.spyOn(Functions, 'toggleWishlistedProductId');

  beforeEach(() => {
    jest.clearAllMocks();

    (useSession as jest.Mock).mockReturnValue(mockSessionAuthed);

    render(
      <QueryClientProvider client={queryClient}>
        <StoredProducts
          products={mockProductList}
          isLoading={false}
          title="My Wishlist"
          emptyStateText={emptyWishlistText}
        />
      </QueryClientProvider>,
    );
  });

  it('renders wishlist icon with the product on wishlist page', () => {
    (usePathname as jest.Mock).mockReturnValue('/profile/my-wishlist');

    expect(screen.getAllByTestId(/^wishlist-icon/)).toHaveLength(
      mockProductList.length,
    );
  });

  it('calls handleRemoveFromWishlist and toggleWishlistedProductId when the wishlist icon is clicked', () => {
    (usePathname as jest.Mock).mockReturnValue('/profile/my-wishlist');

    const firstProductWishlistIcon = screen.getByTestId(
      `wishlist-icon-${mockProduct1.id}`,
    );
    fireEvent.click(firstProductWishlistIcon);

    expect(Functions.toggleWishlistedProductId).toHaveBeenCalledWith(
      mockProduct1.id.toString(),
      mockUserId,
    );
  });

  it('shows success notification when the wishlist icon is clicked', async () => {
    (usePathname as jest.Mock).mockReturnValue('/profile/my-wishlist');

    const successMessage = 'Successfully removed from wishlist';

    const firstProductWishlistIcon = screen.getByTestId(
      `wishlist-icon-${mockProduct1.id}`,
    );
    fireEvent.click(firstProductWishlistIcon);

    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith(successMessage, {
        variant: 'success',
        autoHideDuration: 2000,
      });
    });
  });

  it("doesn't render wishlist icons on recently viewed products page", () => {
    (usePathname as jest.Mock).mockReturnValue('/profile/recently-viewed');

    cleanup();

    render(
      <QueryClientProvider client={queryClient}>
        <StoredProducts
          products={mockProductList}
          isLoading={false}
          title="Recently viewed"
          emptyStateText={emptyRecentlyViewedText}
        />
      </QueryClientProvider>,
    );

    expect(screen.queryAllByTestId(/^wishlist-icon/)).toHaveLength(0);
  });
});

describe('StoredProducts Component Utility Functions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
    (useSession as jest.Mock).mockReturnValue(mockSessionAuthed);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('gets wishlisted product IDs', () => {
    (usePathname as jest.Mock).mockReturnValue('/profile/my-wishlist');

    render(
      <QueryClientProvider client={queryClient}>
        <StoredProducts
          products={mockProductList}
          isLoading={false}
          title="My Wishlist"
          emptyStateText={emptyWishlistText}
        />
      </QueryClientProvider>,
    );

    localStorage.setItem(
      `wishlisted_${mockUserId}`,
      JSON.stringify([mockProduct1.id.toString(), mockProduct2.id.toString()]),
    );

    const storedIds = getStoredProductIds('wishlisted', mockUserId.toString());
    expect(storedIds).toEqual([
      mockProduct1.id.toString(),
      mockProduct2.id.toString(),
    ]);
  });

  it('returns empty array on server to prevent errors', () => {
    const originalWindow = globalThis.window;
    // Typescript gives error because it says if you delete a property, make it optional. However
    // window is not an object we created, so either ignore it or add strictNullChecks=false to tsconfig
    // @ts-ignore
    delete globalThis.window;

    const result = getStoredProductIds('wishlisted');
    expect(result).toEqual([]);

    globalThis.window = originalWindow;
  });

  it('gets recently viewed product IDs', () => {
    (usePathname as jest.Mock).mockReturnValue('/profile/my-wishlist');

    render(
      <QueryClientProvider client={queryClient}>
        <StoredProducts
          products={mockProductList}
          isLoading={false}
          title="Recently viewed"
          emptyStateText={emptyRecentlyViewedText}
        />
      </QueryClientProvider>,
    );

    localStorage.setItem(
      `lastViewed_${mockUserId}`,
      JSON.stringify([mockProduct1.id.toString(), mockProduct2.id.toString()]),
    );

    const storedIds = getStoredProductIds('lastViewed', mockUserId.toString());
    expect(storedIds).toEqual([
      mockProduct1.id.toString(),
      mockProduct2.id.toString(),
    ]);
  });

  it('checks if a product is wishlisted', () => {
    (usePathname as jest.Mock).mockReturnValue('/profile/my-wishlist');

    render(
      <QueryClientProvider client={queryClient}>
        <StoredProducts
          products={mockProductList}
          isLoading={false}
          title="My Wishlist"
          emptyStateText={emptyWishlistText}
        />
      </QueryClientProvider>,
    );

    localStorage.setItem(
      `wishlisted_${mockUserId}`,
      JSON.stringify([mockProduct1.id.toString()]),
    );

    const wishlisted = isProductWishlisted(
      mockProduct1.id.toString(),
      mockUserId.toString(),
    );

    const notWishlisted = isProductWishlisted(
      mockProduct2.id.toString(),
      mockUserId.toString(),
    );

    expect(wishlisted).toBe(true);
    expect(notWishlisted).toBe(false);
  });

  it('removes product from wishlist', () => {
    (usePathname as jest.Mock).mockReturnValue('/profile/my-wishlist');

    render(
      <QueryClientProvider client={queryClient}>
        <StoredProducts
          products={mockProductList}
          isLoading={false}
          title="My Wishlist"
          emptyStateText={emptyWishlistText}
        />
      </QueryClientProvider>,
    );

    localStorage.setItem(
      `wishlisted_${mockUserId}`,
      JSON.stringify([mockProduct1.id.toString(), mockProduct2.id.toString()]),
    );

    Functions.toggleWishlistedProductId(
      mockProduct1.id.toString(),
      mockUserId.toString(),
    );

    const wishlistedProducts = JSON.parse(
      localStorage.getItem(`wishlisted_${mockUserId}`) || '',
    );

    expect(wishlistedProducts).toEqual([mockProduct2.id.toString()]);
  });
});
