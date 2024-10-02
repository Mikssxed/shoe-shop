'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Box } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';

import ControlledInput from '@/components/common/ControlledInput';
import {
  IReactQueryError,
  IResetPasswordRequest,
  IResetPasswordResponse,
} from '@/lib/types';
import { ResetPasswordValidation } from '@/lib/validation';
import { resetPassword } from '@/tools';
import BaseButton from '../ui/BaseButton';
import { buttonStyles } from '@/styles/commonStyles';

const defaultValues = {
  password: '',
  passwordConfirmation: '',
};

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const code: string | null = searchParams.get('code');
  const router = useRouter();

  const mutation: UseMutationResult<
    IResetPasswordResponse,
    IReactQueryError,
    IResetPasswordRequest
  > = useMutation({
    mutationFn: resetPassword,
    onError(error) {
      enqueueSnackbar(error.message || 'Something went wrong!', {
        variant: 'error',
        autoHideDuration: 10000,
      });
    },
    onSuccess() {
      enqueueSnackbar('Your password was changed!', {
        variant: 'success',
        autoHideDuration: 10000,
      });
      router.push('/auth/sign-in');
    },
  });

  const { handleSubmit, control } = useForm<
    z.infer<typeof ResetPasswordValidation>
  >({
    resolver: zodResolver(ResetPasswordValidation),
    defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof ResetPasswordValidation>) => {
    await mutation.mutateAsync({
      ...data,
      code: code,
    });
  };

  return (
    <Box
      component="form"
      sx={{
        m: '40px 0 16px 0',
        display: 'flex',
        flexDirection: 'column',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        <ControlledInput
          name="password"
          control={control}
          label="Password"
          required
          placeholder="at least 8 characters"
          type="password"
        />
        <ControlledInput
          name="passwordConfirmation"
          control={control}
          label="Confirm Password"
          required
          placeholder="at least 8 characters"
          type="password"
        />
      </Box>

      <BaseButton
        type="submit"
        disabled={mutation.isPending}
        sx={{
          ...buttonStyles.authBtn,
          ...buttonStyles.disabledBtn,
          mt: '20px',
        }}
      >
        {mutation.isPending ? 'Loading...' : 'Reset Password'}
      </BaseButton>
    </Box>
  );
};

export default ResetPasswordForm;
