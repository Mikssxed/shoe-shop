import { useSession } from 'next-auth/react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

import {
  IImage,
  IReactQueryError,
  IUpdateUserRequest,
  IUser,
  IUploadImageRes,
  IUploadImageReq,
} from '@/lib/types';
import {
  deleteAvatar,
  deleteProduct,
  queryClient,
  removeProductFromStoresOnDelete,
  updateProfile,
  uploadImage,
} from '@/tools';

/**
 * Custom hook that returns a mutation for updating a user profile using React Query.
 * The mutation sends user data to the `updateProfile` API function and handles
 * success and error cases using `notistack` for notifications.
 *
 * On success:
 * - Retrieves the latest uploaded avatar from the query cache.
 * - Merges the updated user information with the current session using NextAuth's `update` function.
 * - Displays a success notification.
 *
 * On error:
 * - Displays an error notification with the received error message.
 *
 * @returns {UseMutationResult<IUser, IReactQueryError, IUpdateUserRequest>}
 * - A React Query mutation result that includes methods such as `mutate`, `mutateAsync`, and `reset`.
 *
 * @typedef {IUser} IUser - The user object structure.
 * @typedef {IReactQueryError} IReactQueryError - Error structure expected in the mutation result.
 * @typedef {IUpdateUserRequest} IUpdateUserRequest - The request payload structure for updating a user profile.
 * @typedef {IImage} IImage - Image object structure used for avatar updates.
 */

export const useUpdateProfileMutation = (): UseMutationResult<
  IUser,
  IReactQueryError,
  IUpdateUserRequest
> => {
  const { data: session, update } = useSession();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: async updatedUser => {
      await update({
        user: { ...session?.user, ...updatedUser },
      });

      enqueueSnackbar('Data successfully updated', {
        variant: 'success',
        autoHideDuration: 10000,
      });
    },
    onError: error => {
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 10000,
      });
    },
  });
};

/**
 * Custom hook that returns a mutation for uploading an avatar image using React Query.
 * The mutation sends image data to the `uploadImage` API function and handles
 * success and error cases using `notistack` for notifications.
 *
 * On success:
 * - Stores the uploaded avatar in the query cache under the key `uploadedAvatar`.
 * - Displays a success notification indicating the image was uploaded successfully.
 *
 * On error:
 * - Displays an error notification with the received error message.
 *
 * @returns {UseMutationResult<IUploadImageRes, IReactQueryError, IUploadImageReq>}
 * - A React Query mutation result that includes methods such as `mutate`, `mutateAsync`, and `reset`.
 *
 * @typedef {IUploadImageRes} IUploadImageRes - The response structure for image upload results.
 * @typedef {IReactQueryError} IReactQueryError - Error structure expected in the mutation result.
 * @typedef {IUploadImageReq} IUploadImageReq - The request payload structure for uploading an image.
 * @typedef {IImage} IImage - Image object structure used for handling the uploaded avatar.
 */

export const useUploadAvatarMutation = (): UseMutationResult<
  IUploadImageRes,
  IReactQueryError,
  IUploadImageReq
> => {
  const { data: session, update } = useSession();

  return useMutation({
    mutationFn: uploadImage,
    onSuccess: async (data: IImage[]) => {
      const updatedUser = await updateProfile({
        id: session?.user.id,
        jwt: session?.user?.accessToken,
        avatar: data[0],
      });

      await update({ user: { ...session?.user, avatar: data[0] } });

      enqueueSnackbar('Image successfully uploaded', {
        variant: 'success',
        autoHideDuration: 10000,
      });
    },
    onError: error => {
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 10000,
      });
    },
  });
};

/**
 * Custom hook to delete the user's avatar using a mutation.
 *
 * This hook performs the deletion of the user's avatar by calling the `deleteAvatar` function
 * and updates the session with the new user data (without an avatar). It also shows
 * success or error notifications based on the result of the operation.
 *
 * @returns {UseMutationResult<IUser, IReactQueryError, void>} - Returns a mutation result object
 * that contains information about the mutation's status, data, and methods to trigger the mutation.
 *
 * @example
 * const { mutate: deleteAvatar } = useDeleteAvatarMutation();
 * deleteAvatar();
 */

export const useDeleteAvatarMutation = (): UseMutationResult<
  IUser,
  IReactQueryError,
  void
> => {
  const { data: session, update } = useSession();

  return useMutation({
    mutationFn: () =>
      deleteAvatar({
        userId: session?.user?.id,
        jwt: session?.user?.accessToken,
      }),

    onSuccess: async (user: IUser) => {
      queryClient.setQueryData(['uploadedAvatar'], null);
      await update({
        user: { ...session?.user, avatar: null },
      });
      enqueueSnackbar('Image successfully deleted', {
        variant: 'success',
        autoHideDuration: 10000,
      });
    },

    onError: error => {
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 10000,
      });
    },
  });
};

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
