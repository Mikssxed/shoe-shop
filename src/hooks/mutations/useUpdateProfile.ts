"use client"

import { useSession } from 'next-auth/react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

import { IReactQueryError, IUpdateUserRequest, IUser } from '@/lib/types';
import { updateProfile } from '@/tools';

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
