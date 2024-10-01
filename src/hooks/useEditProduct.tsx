import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editProduct } from '@/tools';
import { enqueueSnackbar } from 'notistack';

const useEditProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editProduct,
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

export default useEditProduct;
