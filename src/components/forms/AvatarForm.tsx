'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Box, Toolbar, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import ProfilePicture from '@/components/common/ProfilePicture';
import { profileSettingsStyles as styles } from '@/styles/profile/profileSettingsPage.style';
import { avatarValidation } from '@/lib/validation';
import { useUploadAvatarMutation } from '@/tools/mutations';
import DeleteAvatarModal from '@/components/modals/DeleteAvatarModal';

export default function AvatarForm() {
  const { data: session, status } = useSession();

  const uploadMutation = useUploadAvatarMutation();
  if (uploadMutation.isSuccess) uploadMutation.reset();

  const [isOpenedDeleteModal, setIsOpenedDeleteModal] =
    useState<boolean>(false);

  const { register, handleSubmit, watch } = useForm<
    z.infer<typeof avatarValidation>
  >({
    resolver: zodResolver(avatarValidation),
  });
  const watchAvatar = watch('avatar');

  const onSubmit = async (data: z.infer<typeof avatarValidation>) => {
    const formData = new FormData();
    formData.append('files', data.avatar[0]);

    await uploadMutation.mutateAsync(formData);
  };

  useEffect(() => {
    if (watchAvatar?.length) handleSubmit(onSubmit)();
  }, [watchAvatar]);

  const onOpenModal = () => setIsOpenedDeleteModal(true);
  const onCloseModal = () => setIsOpenedDeleteModal(false);

  return (
    <Box component="form" sx={styles.infoBox}>
      <Box component="div" sx={styles.avatarContainer}>
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
            <Button
              variant="outlined"
              component={'span'}
              disabled={uploadMutation.isPending || status !== 'authenticated'}
              sx={styles.avatarControlButton}
            >
              {uploadMutation.isPending ? 'Loading...' : 'Change Photo'}
            </Button>
          </label>
        </Box>

        <Button
          variant="contained"
          sx={styles.avatarControlButton}
          onClick={onOpenModal}
          disabled={!session?.user?.avatar}
        >
          Delete
        </Button>

        <DeleteAvatarModal
          isOpened={isOpenedDeleteModal}
          onCloseModal={onCloseModal}
        />
      </Toolbar>
    </Box>
  );
}
