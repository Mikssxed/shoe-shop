'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';

import ControlledInput from '@/components/common/ControlledInput';
import { UpdateProfileValidation } from '@/lib/validation';
import { updateProfileFormStyles as styles } from '@/styles/forms/updateProfileForm.style';
import { useUpdateProfileMutation } from '@/tools/mutations';
import { UpdateProfileFormSkeleton } from '@/components/ui/loading-skeletons/UpdateProfileFormSkeleton';
import BaseButton from '../ui/BaseButton';

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
};

export const UpdateProfileForm: React.FC = () => {
  const { data: session, status } = useSession();

  const { mutateAsync, isPending } = useUpdateProfileMutation();

  const { handleSubmit, reset, control } = useForm<
    z.infer<typeof UpdateProfileValidation>
  >({
    resolver: zodResolver(UpdateProfileValidation),
    defaultValues,
  });

  useEffect(() => {
    reset({
      firstName: session?.user.firstName || '',
      lastName: session?.user.lastName || '',
      phoneNumber: session?.user.phoneNumber || '',
      email: session?.user.email || '',
    });
  }, [status]);

  const onSubmit = async (data: z.infer<typeof UpdateProfileValidation>) => {
    await mutateAsync({
      ...data,
      id: session?.user.id,
      jwt: session?.user.accessToken,
    });
  };

  if (status === 'loading') return <UpdateProfileFormSkeleton />;

  return (
    <Box
      component="form"
      autoComplete="on"
      sx={styles.root}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ControlledInput
        required
        name={'firstName'}
        control={control}
        label={'Name'}
        placeholder={'Unknown'}
        inputStyle={styles.field}
      />
      <ControlledInput
        name={'lastName'}
        control={control}
        label={'Surname'}
        placeholder={'Unknown'}
        inputStyle={styles.field}
      />
      <Box sx={styles.notAllowedWrapper}>
        <ControlledInput
          name={'email'}
          control={control}
          label={'Email'}
          placeholder={'example@example.com'}
          inputStyle={styles.field}
          disabled
        />
      </Box>
      <ControlledInput
        name={'phoneNumber'}
        control={control}
        label={'Phone number'}
        placeholder={'+000123456789'}
        inputStyle={styles.field}
      />
      <BaseButton type="submit" sx={styles.submitButton} disabled={isPending}>
        {isPending ? 'Loading...' : 'Save Changes'}
      </BaseButton>
    </Box>
  );
};
