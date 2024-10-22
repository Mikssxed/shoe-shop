'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Toolbar } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { z } from 'zod';

import ProfilePicture from '@/components/common/ProfilePicture';
import DeleteAvatarModal from '@/components/modals/DeleteAvatarModal';
import { avatarValidation } from '@/lib/validation';
import { profileSettingsStyles as styles } from '@/styles/profile/profileSettingsPage.style';
import { useUploadAvatarMutation } from '@/hooks';
import BaseButton from '../ui/BaseButton';

export default function AvatarForm() {
  const { data: session, status } = useSession();

  const uploadMutation = useUploadAvatarMutation();
  if (uploadMutation.isSuccess) uploadMutation.reset();

  const [isOpenedDeleteModal, setIsOpenedDeleteModal] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof avatarValidation>>({
    resolver: zodResolver(avatarValidation),
  });
  const watchAvatar = watch('avatar');

  const onSubmit = async (data: z.infer<typeof avatarValidation>) => {
    if (data.avatar && data.avatar.length > 0) {
      const formData = new FormData();
      formData.append('files', data.avatar[0]);

      await uploadMutation.mutateAsync(formData);
    }
  };

  useEffect(() => {
    if (errors.avatar) {
      enqueueSnackbar(errors.avatar.message, {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }
  }, [errors.avatar]);

  useEffect(() => {
    if (watchAvatar?.length) handleSubmit(onSubmit)();
  }, [watchAvatar]);

  const onOpenModal = () => setIsOpenedDeleteModal(true);
  const onCloseModal = () => setIsOpenedDeleteModal(false);

  return (
    <Box component="form" sx={styles.infoBox}>
      <Box sx={styles.avatarContainer}>
        <ProfilePicture avatarStyle={styles.profilePicture} />
      </Box>

      <Toolbar sx={styles.buttonContainer} disableGutters variant="dense">
        <Box>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="file-upload"
            type="file"
            {...register('avatar')}
          />
          <label htmlFor="file-upload">
            <BaseButton
              variant="outlined"
              component={'span'}
              disabled={uploadMutation.isPending || status !== 'authenticated'}
              sx={styles.avatarControlButton}
            >
              {uploadMutation.isPending ? 'Loading...' : 'Change Photo'}
            </BaseButton>
          </label>
        </Box>

        <BaseButton
          sx={styles.avatarControlButton}
          onClick={onOpenModal}
          disabled={!session?.user?.avatar}
        >
          Delete
        </BaseButton>

        <DeleteAvatarModal
          isOpened={isOpenedDeleteModal}
          onCloseModal={onCloseModal}
        />
      </Toolbar>
    </Box>
  );
}
