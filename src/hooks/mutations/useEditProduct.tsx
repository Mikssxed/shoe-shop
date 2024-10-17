'use client';

import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

import { queryClient, editProduct } from '@/tools';

/**
 * Custom hook for editing a product using a mutation.
 *
 * @returns {UseMutationResult} - The mutation result object from React Query.
 *
 * @description This hook provides the functionality to edit an existing product by calling the `editProduct` function.
 * It handles success and error scenarios, displays relevant messages using `enqueueSnackbar`, 
 * and ensures the product list is refreshed by invalidating the 'products' query.
 * 
 * Mutation Function:
 * - The `mutationFn` is responsible for sending the request to edit a product.
 * - It takes the product data as a parameter and returns a promise resolving to the server's response.
 * 
 * Success Callback:
 * - The `onSuccess` callback is triggered when the product is successfully edited.
 * - It invalidates the `products` query to refresh the product list and shows a success notification.
 * 
 * Error Callback:
 * - The `onError` callback is triggered when the edit request fails.
 * - It receives the error object and shows the error message using `enqueueSnackbar`.
 */
export const useEditProduct = () => {
  return useMutation({
    mutationFn:  editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      enqueueSnackbar('Product updated successfully', {
        variant: 'success',
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
