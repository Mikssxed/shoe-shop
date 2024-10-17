'use client';

import { useMutation } from '@tanstack/react-query';

/**
 * Custom hook for uploading images using a mutation.
 *
 * @returns {UseMutationResult<IUploadImageRes, IReactQueryError, IUploadImageReq>} - The mutation result object from React Query.
 *
 * @description This hook provides the functionality to upload images by calling the `uploadImages` function.
 * It handles errors and shows notifications using `enqueueSnackbar`.
 * 
 * Mutation Function:
 * - `mutationFn`: The function that sends the request to upload images.
 * - It accepts an object of type `IUploadImageReq` and returns a promise resolving to the upload response of type `IUploadImageRes`.
 * 
 * Error Callback:
 * - The `onError` callback is triggered when the image upload fails.
 * - It shows an error message using `enqueueSnackbar`.
 */
import {
  IReactQueryError,
  IUploadImageReq,
  IUploadImageRes,
} from '@/lib/types';
import { uploadImages } from '@/tools/api';
import { enqueueSnackbar } from 'notistack';

export const useUploadImages = () =>
  useMutation<IUploadImageRes, IReactQueryError, IUploadImageReq>({
    mutationFn: uploadImages,
    onError: () => {
      enqueueSnackbar('Image uploading failed', {
        variant: 'error',
        autoHideDuration: 2000,
      });
    },
  });
