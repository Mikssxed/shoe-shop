import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { ICartItem, ProductAttributes, ProductsResponse } from '@/lib/types';
import { User } from 'next-auth';
import { queryClient } from '.';
import {
  getFiltersData,
  getLastViewed,
  getMyProducts,
  getProduct,
  getProducts,
  getProductsNames,
} from './api';

/**
 * Custom hook to fetch paginated products using infinite scrolling.
 * It fetches the products page by page and merges them into a single list.
 *
 * @param {ProductsResponse} initialProducts - The initial set of products to start with.
 * @param {Object} [params={}] - Optional query parameters to filter or sort products.
 * @param {User} [user] - The current authenticated user.
 * @returns {Object} - The result of the infinite query, including data, fetching status, and pagination.
 */
export const useProducts = (
  initialProducts: ProductsResponse,
  params?: {},
  user?: User,
) => {
  return useInfiniteQuery({
    queryKey: ['products', JSON.stringify(params)],
    queryFn: ({ pageParam }) =>
      user ? getMyProducts(user, pageParam) : getProducts(pageParam, params),
    getNextPageParam: lastPage => {
      if (!lastPage) return undefined;
      const hasNextPage =
        lastPage?.meta?.pagination?.pageCount! >
        lastPage?.meta?.pagination?.page!;
      return hasNextPage ? lastPage?.meta?.pagination?.page! + 1 : undefined;
    },
    select: data => data.pages.flatMap(page => page.data),
    initialPageParam: 1,
    placeholderData: (_, prevQuery) => {
      if (prevQuery || !initialProducts) return;
      return { pages: [initialProducts], pageParams: [1] };
    },
    staleTime: 0,
  });
};

/**
 * Custom hook to fetch filter data (genders, colors, categories, brands, sizes) from the API.
 *
 * @returns {Object} - The result of the query, including data, fetching status, and potential errors.
 */
export const useFilters = () => {
  return useQuery({
    queryKey: ['filters'],
    queryFn: getFiltersData,
  });
};

/**
 * Custom hook to fetch a single product by its ID from the API.
 *
 * @param {string} id - The ID of the product to retrieve.
 * @returns {Object} - The result of the query, including the product data, fetching status, and potential errors.
 */
export const useProduct = (id: string) => {
  return useQuery({ queryKey: ['product', id], queryFn: () => getProduct(id) });
};

/**
 * Custom hook to fetch product names that contain a specific search string.
 *
 * @param {string} searchString - The string to search for in product names.
 * @returns {Object} - The result of the query, including the product names, fetching status, and potential errors.
 */
export const useProductsNames = (searchString: string) => {
  return useQuery({
    queryKey: ['names', searchString],
    queryFn: () => getProductsNames(searchString),
    select: data => data.data,
  });
};

/**
 * Custom hook to fetch items from cart state.
 *
 * @param {string | undefined} userId - The ID of the current user, or undefined if not authenticated.
 * @returns {Object[]} - The result of the query, including an array of all cart items, fetching status, and potential errors.
 */
export const useQueryCartItems = (userId: string | undefined) => {
  const storageKey = userId ? `cart_${userId}` : 'cart';
  return useQuery<ICartItem[]>({
    queryKey: [storageKey],
    queryFn: () => {
      if (
        typeof window === 'undefined' ||
        globalThis.localStorage === undefined
      ) {
        return [];
      }

      const guestCart = JSON.parse(localStorage.getItem('cart') || '[]');

      if (userId) {
        const userCart = JSON.parse(localStorage.getItem(storageKey) || '[]');

        const mergedCart = mergeCarts(guestCart, userCart);

        localStorage.setItem(storageKey, JSON.stringify(mergedCart));

        localStorage.removeItem('cart');

        return mergedCart;
      }

      return guestCart;
    },
  });
};

/**
 * Merges the guest cart and the user cart by combining matching items.
 *
 * @param {ICartItem[]} guestCart - The cart items for the guest user.
 * @param {ICartItem[]} userCart - The cart items for the authenticated user.
 * @returns {ICartItem[]} - The merged array of cart items.
 */
const mergeCarts = (
  guestCart: ICartItem[],
  userCart: ICartItem[],
): ICartItem[] => {
  const mergedCart = [...guestCart];

  userCart.forEach(userItem => {
    const existingItem = mergedCart.find(
      item =>
        item.id === userItem.id && item.selectedSize === userItem.selectedSize,
    );

    if (existingItem) {
      existingItem.amount += userItem.amount;
    } else {
      mergedCart.push(userItem);
    }
  });

  return mergedCart;
};

/**
 * Custom hook to add an item to the cart state.
 *
 * If the item with the same `product.id` and `selectedSize` already exists in the cart,
 * its `amount` is incremented. If the item does not exist, it is added to the cart.
 *
 * @param {ProductAttributes} product - The product object that includes all properties of the item to add to the cart.
 * @param {string | undefined} userId - The ID of the current user, or undefined if not authenticated.
 * @param {number | 'unselected'} [selectedSize='unselected'] - The selected size of the product. If no size is selected, it defaults to 'unselected'.
 * @returns {void} Updates the cart state in the query client.
 */
export const addToCartQuery = (
  product: ProductAttributes,
  userId: string | undefined,
  selectedSize: number | 'unselected' = 'unselected',
) => {
  const storageKey = userId ? `cart_${userId}` : 'cart';
  queryClient.setQueryData([storageKey], (oldItems: ICartItem[] = []) => {
    const updatedCart = oldItems.find(
      item => item.id === product.id && item.selectedSize === selectedSize,
    )
      ? oldItems.map(item =>
          item.id === product.id && item.selectedSize === selectedSize
            ? { ...item, amount: item.amount + 1 }
            : item,
        )
      : [...oldItems, { ...product, amount: 1, selectedSize }];

    localStorage.setItem(storageKey, JSON.stringify(updatedCart));

    return updatedCart;
  });
};

/**
 * Custom hook to remove an item from the cart state.
 *
 * It removes the item from the cart that matches the given `id` and `selectedSize`.
 *
 * @param {number} id - The ID of the product to remove from the cart.
 * @param {number | 'unselected'} selectedSize - The selected size of the product to be removed.
 * @param {string | undefined} userId - The ID of the current user, or undefined if not authenticated.
 * @returns {void} Updates the cart state in the query client.
 */
export const deleteFromCartQuery = (
  id: number,
  selectedSize: number | 'unselected',
  userId: string | undefined,
) => {
  const storageKey = userId ? `cart_${userId}` : 'cart';

  queryClient.setQueryData([storageKey], (cartItems: ICartItem[]) => {
    const updatedCart = cartItems.filter(
      item => !(item.id === id && item.selectedSize === selectedSize),
    );

    localStorage.setItem(storageKey, JSON.stringify(updatedCart));

    return updatedCart;
  });
};

/**
 * Custom hook to clear all items in the cart state.
 *
 * @param {string | undefined} userId - The ID of the current user, or undefined if not authenticated.
 * @returns {void} Updates the cart state in the query client.
 */
export const clearCartQuery = (userId: string | undefined) => {
  const storageKey = userId ? `cart_${userId}` : 'cart';
  localStorage.removeItem(storageKey);
  return queryClient.setQueryData([storageKey], []);
};

/**
 * Custom hook to increase the amount of a cart item.
 *
 * It increments the `amount` of the item in the cart that matches the given `id`.
 *
 * @param {number} id - The ID of the product in the cart whose amount needs to be increased.
 * @param {string | undefined} userId - The ID of the current user, or undefined if not authenticated.
 * @param {number | 'unselected'} selectedSize - The selected size of the product to be increased.
 * @returns {void} Updates the cart state in the query client.
 */
export const increaseCartItemAmount = (
  id: number,
  userId: string | undefined,

  selectedSize: number | 'unselected',
) => {
  const storageKey = userId ? `cart_${userId}` : 'cart';
  queryClient.setQueryData([storageKey], (cartItems: ICartItem[]) => {
    const updatedCart = cartItems.map(item =>
      item.id === id && item.selectedSize === selectedSize
        ? { ...item, amount: item.amount + 1 }
        : item,
    );

    localStorage.setItem(storageKey, JSON.stringify(updatedCart));

    return updatedCart;
  });
};

/**
 * Custom hook to decrease the amount of a cart item.
 *
 * It decrements the `amount` of the item in the cart that matches the given `id`.
 * If the item's amount reaches 0, the item is still kept in the cart.
 *
 * @param {number} id - The ID of the product in the cart whose amount needs to be decreased.
 * @param {string | undefined} userId - The ID of the current user, or undefined if not authenticated.
 * @param {number | 'unselected'} selectedSize - The selected size of the product to be decreased.
 * @returns {void} Updates the cart state in the query client.
 */
export const decreaseCartItemAmount = (
  id: number,
  userId: string | undefined,
  selectedSize: number | 'unselected',
) => {
  const storageKey = userId ? `cart_${userId}` : 'cart';
  queryClient.setQueryData([storageKey], (cartItems: ICartItem[]) => {
    const updatedCart = cartItems.map(item =>
      item.id === id && item.selectedSize === selectedSize
        ? { ...item, amount: Math.max(0, item.amount - 1) }
        : item,
    );

    localStorage.setItem(storageKey, JSON.stringify(updatedCart));

    return updatedCart;
  });
};

/**
 * Custom hook to change the selected size of a shoe in the cart for a specific user.
 *
 * If the new size already exists in the cart for the same shoe, it combines the amounts.
 * Otherwise, it updates the selected size of the shoe.
 *
 * @param {ICartItem} shoe - The shoe item in the cart whose size is being changed.
 * @param {number} newSize - The new size to update the shoe to.
 * @param {string | undefined} userId - The ID of the current user, or undefined if not authenticated.
 * @returns {void} Updates the cart state in the query client.
 */
export const changeSelectedSize = (
  shoe: ICartItem,
  newSize: number,
  userId: string | undefined,
) => {
  const storageKey = userId ? `cart_${userId}` : 'cart';
  queryClient.setQueryData([storageKey], (cartItems: ICartItem[]) => {
    const existedItem = cartItems.find(
      item => item.id === shoe.id && item.selectedSize === newSize,
    );

    let updatedCart;
    if (existedItem) {
      updatedCart = cartItems
        .map(item => {
          if (item.id === shoe.id && item.selectedSize === newSize)
            return { ...item, amount: item.amount + shoe.amount };
          if (item.id === shoe.id && item.selectedSize === shoe.selectedSize)
            return null;
          return item;
        })
        .filter(item => item !== null);
    } else {
      updatedCart = cartItems.map(item =>
        item.id === shoe.id && item.selectedSize === shoe.selectedSize
          ? { ...item, selectedSize: newSize }
          : item,
      );
    }

    localStorage.setItem(storageKey, JSON.stringify(updatedCart));

    return updatedCart;
  });
};

/**
 * Custom hook to fetch last viewed products by their IDs.
 *
 * @param {string[]} ids - Array of product IDs to retrieve.
 * @returns {Object} - The result of the query, including last viewed product data, fetching status, and potential errors.
 */
export const useLastViewed = (ids: string[]) => {
  return useQuery({
    queryKey: ['lastViewed', ids],
    queryFn: () => getLastViewed(ids),
    select: data => data.data,
  });
};
