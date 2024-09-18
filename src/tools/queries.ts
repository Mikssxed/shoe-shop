import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { ProductsResponse } from "@/lib/types";
import {
  getFiltersData,
  getProduct,
  getProducts,
  getProductsNames,
} from "./api";

export const useProducts = (initialProducts: ProductsResponse, params?: {}) => {
  return useInfiniteQuery({
    queryKey: ["products", params],
    queryFn: ({ pageParam }) => getProducts(pageParam, params),
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      const hasNextPage =
        lastPage?.meta?.pagination?.pageCount! >
        lastPage?.meta?.pagination?.page!;
      return hasNextPage ? lastPage?.meta?.pagination?.page! + 1 : undefined;
    },
    select: (data) => data.pages.flatMap((page) => page.data),
    initialPageParam: 1,
    initialData: {
      pages: [initialProducts],
      pageParams: [1],
    },
    staleTime: 0,
  });
};

export const useFilters = () => {
  return useQuery({ queryKey: ["filters"], queryFn: getFiltersData });
};

export const useProduct = (id: string) => {
  return useQuery({ queryKey: ["product", id], queryFn: () => getProduct(id) });
};

export const useProductsNames = (searchString: string) => {
  return useQuery({
    queryKey: ["names", searchString],
    queryFn: () => getProductsNames(searchString),
    select: (data) => data.data,
  });
};
