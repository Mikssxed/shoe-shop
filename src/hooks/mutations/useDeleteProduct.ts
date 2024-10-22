"use client"

import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

import {
  deleteProduct,
  queryClient,
  removeProductFromStoresOnDelete,
} from '@/tools';

/**
 * Custom hook to delete a product and handle success and error scenarios.
 * This hook uses `useMutation` from React Query to perform the deletion and
 * manage the cache and user notifications on success or failure.
 *
 * @param {string} name - The name of the product to delete.
 * @param {number} id - The unique identifier of the product.
 * @param {string} [userId] - Optional user ID. If provided, it customizes the cache key for cart updates.
 *
 * @returns {object} - A React Query `useMutation` object that contains mutation-related methods and states.
 *
 * @example
 * const { mutate } = useDeleteProduct('Sneakers', 123, 'user456');
 * mutate();
 */
export const useDeleteProduct = (name: string, id: number, userId?: string) => {
  const storageKey = userId ? `cart_${userId}` : 'cart';
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      removeProductFromStoresOnDelete(id, userId);
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: [storageKey] });
      enqueueSnackbar(`Product "${name}" has been deleted.`, {
        variant: 'default',
        autoHideDuration: 5000,
      });
    },
    onError: (error: any) => {
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 5000,
      });
    },
  });
};
