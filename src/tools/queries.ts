import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getFiltersData, getMaxPrice, getProduct, getProducts } from "./api";

export const useProducts = (params?: {}) => {
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
  });
};

export const useMaxPrice = () => {
  return useQuery({
    queryKey: ["maxPrice"],
    queryFn: getMaxPrice,
  });
};

export const useFilters = () => {
  return useQuery({ queryKey: ["filters"], queryFn: getFiltersData });
};

export const useProduct = (id: string) => {
  return useQuery({ queryKey: ["product", id], queryFn: () => getProduct(id) });
};
