'use client';

import { useSession } from 'next-auth/react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

import { IImage, IReactQueryError, IUploadImageRes } from '@/lib/types';
import { updateProfile, uploadImages } from '@/tools';

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
  FormData
> => {
  const { data: session, update } = useSession();

  return useMutation({
    mutationFn: uploadImages,
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
