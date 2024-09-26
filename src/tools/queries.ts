import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import {
  ICartItem,
  IImage,
  ProductAttributes,
  ProductsResponse,
} from '@/lib/types';
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
 * @returns {Object[]} - The result of the query, including array of all cart items, fetching status, and potential errors.
 */

export const useQueryCartItems = () => {
  return useQuery<ICartItem[]>({
    queryKey: ['cart'],
    queryFn: () => queryClient.getQueryData<ICartItem[]>(['cart']) || [],
    initialData: [],
  });
};

/**
 * Custom hook to add an item to the cart state.
 *
 * If the item with the same `product.id` and `selectedSize` already exists in the cart,
 * its `amount` is incremented. If the item does not exist, it is added to the cart.
 *
 * @param {ProductAttributes} product - The product object that includes all properties of the item to add to the cart.
 * @param {number | 'unselected'} [selectedSize='unselected'] - The selected size of the product. If no size is selected, it defaults to 'unselected'.
 * @returns {void} Updates the cart state in the query client.
 */

export const addToCartQuery = (
  product: ProductAttributes,
  selectedSize: number | 'unselected' = 'unselected',
) => {
  return queryClient.setQueryData(['cart'], (oldItems: ICartItem[] = []) =>
    oldItems.find(
      item => item.id === product.id && item.selectedSize === selectedSize,
    )
      ? oldItems.map(item =>
          item.id === product.id && item.selectedSize === selectedSize
            ? { ...item, amount: item.amount + 1 }
            : item,
        )
      : [...oldItems, { ...product, amount: 1, selectedSize }],
  );
};

/**
 * Custom hook to remove an item from the cart state.
 *
 * It removes the item from the cart that matches the given `id` and `selectedSize`.
 *
 * @param {number} id - The ID of the product to remove from the cart.
 * @param {number | 'unselected'} selectedSize - The selected size of the product to be removed.
 * @returns {void} Updates the cart state in the query client.
 */

export const deleteFromCartQuery = (
  id: number,
  selectedSize: number | 'unselected',
) => {
  return queryClient.setQueryData(['cart'], (cartItems: ICartItem[]) =>
    cartItems.filter(
      item => !(item.id === id && item.selectedSize === selectedSize),
    ),
  );
};

/**
 * Custom hook to clear all items in the cart state.
 *
 * @returns {void} Updates the cart state in the query client.
 */

export const clearCartQuery = () => {
  return queryClient.setQueryData(['cart'], []);
};

/**
 * Custom hook to increase the amount of a cart item.
 *
 * It increments the `amount` of the item in the cart that matches the given `id`.
 *
 * @param {number} id - The ID of the product in the cart whose amount needs to be increased.
 * @returns {void} Updates the cart state in the query client.
 */

export const increaseCartItemAmount = (id: number) => {
  return queryClient.setQueryData(['cart'], (cartItems: ICartItem[]) =>
    cartItems.map(item =>
      item.id === id ? { ...item, amount: item.amount + 1 } : item,
    ),
  );
};

/**
 * Custom hook to decrease the amount of a cart item.
 *
 * It decrements the `amount` of the item in the cart that matches the given `id`.
 * If the item's amount reaches 0, the item is still kept in the cart.
 *
 * @param {number} id - The ID of the product in the cart whose amount needs to be decreased.
 * @returns {void} Updates the cart state in the query client.
 */

export const decreaseCartItemAmount = (id: number) => {
  return queryClient.setQueryData(['cart'], (cartItems: ICartItem[]) =>
    cartItems.map(item =>
      item.id === id ? { ...item, amount: item.amount - 1 } : item,
    ),
  );
};

/**
 * Custom hook to change the selected size of a shoe in the cart.
 *
 * If the new size already exists in the cart for the same shoe, it combines the amounts.
 * Otherwise, it updates the selected size of the shoe.
 *
 * @param {ICartItem} shoe - The shoe item in the cart whose size is being changed.
 * @param {number} newSize - The new size to update the shoe to.
 * @returns {void} Updates the cart state in the query client.
 */

export const changeSelectedSize = (shoe: ICartItem, newSize: number) => {
  return queryClient.setQueryData(['cart'], (cartItems: ICartItem[]) => {
    const existedItem = cartItems.find(
      item => item.id === shoe.id && item.selectedSize === newSize,
    );

    if (existedItem) {
      return cartItems
        .map(item => {
          if (item.id === shoe.id && item.selectedSize === newSize)
            return { ...item, amount: item.amount + shoe.amount };
          if (item.id === shoe.id && item.selectedSize === shoe.selectedSize)
            return null;
          return item;
        })
        .filter(item => item);
    }

    return cartItems.map(item =>
      item.id === shoe.id && item.selectedSize === shoe.selectedSize
        ? { ...item, selectedSize: newSize }
        : item,
    );
  });
};

export const useLastViewed = (ids: string[]) => {
  return useQuery({
    queryKey: ['lastViewed', ids],
    queryFn: () => getLastViewed(ids),
    select: data => data.data,
  });
};
