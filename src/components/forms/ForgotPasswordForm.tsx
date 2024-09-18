'use client';
//TODO: make it SSG
import {zodResolver} from '@hookform/resolvers/zod';
import {Alert, Box, Button} from '@mui/material';
import {UseMutationResult, useMutation} from '@tanstack/react-query';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

import ControlledInput from '@/components/common/ControlledInput';
import {
  IForgotPasswordReq,
  IForgotPasswordRes,
  IReactQueryError,
} from '@/lib/types';
import {ForgotPasswordValidation} from '@/lib/validation';
import {forgotPassword} from '@/tools';

const defaultValues = {
  email: '',
};

const ForgotPasswordForm = () => {
  const {handleSubmit, control} = useForm<
    z.infer<typeof ForgotPasswordValidation>
  >({
    resolver: zodResolver(ForgotPasswordValidation),
    defaultValues,
  });

  const mutation: UseMutationResult<
    IForgotPasswordRes,
    IReactQueryError,
    IForgotPasswordReq
  > = useMutation({
    mutationFn: forgotPassword,
  });

  const onSubmit = (data: z.infer<typeof ForgotPasswordValidation>) => {
    try {
      mutation.mutateAsync({
        email: data.email,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (mutation.isSuccess) {
    return (
      <Alert
        severity="success"
        sx={{
          maxWidth: '436px',
          py: '14px',
          my: '14px',
          fontSize: '16px',
          borderRadius: '8px',
        }}
      >
        Success. Please, check your email inbox
      </Alert>
    );
  }

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
      <ControlledInput
        name="email"
        control={control}
        label="Email"
        required
        placeholder="example@mail.com"
      />

      {mutation.isError && (
        <Box sx={{maxWidth: '436px', mt: '14px'}}>
          <Alert
            severity={mutation.isSuccess ? 'success' : 'error'}
            sx={{
              py: '14px',
              fontSize: '16px',
              borderRadius: '8px',
            }}
          >
            {mutation.error?.response?.data?.error?.message || 'Unknown error'}
          </Alert>
        </Box>
      )}

      <Button
        variant="contained"
        type="submit"
        sx={{
          mt: '20px',
          maxWidth: '436px',
          py: '14px',
          fontSize: '16px',
          borderRadius: '8px',
        }}
      >
        Reset Password
      </Button>
    </Box>
  );
};

export default ForgotPasswordForm;
