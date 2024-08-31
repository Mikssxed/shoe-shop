import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getFiltersData, getProducts } from "./api";

export const useProducts = () => {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam }) => getProducts(pageParam),
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      const hasNextPage =
        lastPage?.meta?.pagination?.pageCount! >
        lastPage?.meta?.pagination?.page!;
      return hasNextPage ? lastPage?.meta?.pagination?.page! + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export const useFilters = () => {
  return useQuery({ queryKey: ["filters"], queryFn: getFiltersData });
};
