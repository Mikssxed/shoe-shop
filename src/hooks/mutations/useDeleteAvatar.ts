"use client"

import { useSession } from 'next-auth/react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

import { IReactQueryError, IUser } from '@/lib/types';
import { deleteAvatar, queryClient } from '@/tools';

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
