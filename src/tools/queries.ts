import {useInfiniteQuery, useQuery} from '@tanstack/react-query';

import {ProductsResponse} from '@/lib/types';
import {getFiltersData, getProduct, getProducts, getProductsNames} from './api';

/**
 * Custom hook to fetch paginated products using infinite scrolling.
 * It fetches the products page by page and merges them into a single list.
 *
 * @param {ProductsResponse} initialProducts - The initial set of products to start with.
 * @param {Object} [params={}] - Optional query parameters to filter or sort products.
 * @returns {Object} - The result of the infinite query, including data, fetching status, and pagination.
 */
export const useProducts = (initialProducts: ProductsResponse, params?: {}) => {
  return useInfiniteQuery({
    queryKey: ['products', params],
    queryFn: ({pageParam}) => getProducts(pageParam, params),
    getNextPageParam: lastPage => {
      if (!lastPage) return undefined;
      const hasNextPage =
        lastPage?.meta?.pagination?.pageCount! >
        lastPage?.meta?.pagination?.page!;
      return hasNextPage ? lastPage?.meta?.pagination?.page! + 1 : undefined;
    },
    select: data => data.pages.flatMap(page => page.data),
    initialPageParam: 1,
    initialData: {
      pages: [initialProducts],
      pageParams: [1],
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
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
  });
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
