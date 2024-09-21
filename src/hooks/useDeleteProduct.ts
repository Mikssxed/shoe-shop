import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "@/tools";
import { enqueueSnackbar } from "notistack";

const useDeleteProduct = (name: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      enqueueSnackbar(`Product "${name}" has been deleted.`, {
        variant: "default",
        autoHideDuration: 5000,
      });
    },
    onError: (error: any) => {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 5000,
      });
    },
  });
};

export default useDeleteProduct;
