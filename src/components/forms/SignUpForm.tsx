'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, Typography } from '@mui/material';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { enqueueSnackbar } from 'notistack';

import ControlledInput from '@/components/common/ControlledInput';
import { IReactQueryError, ISignUpRequest, ISignUpResponse } from '@/lib/types';
import { SignUpFormValidation } from '@/lib/validation';
import { signUp } from '@/tools';
import { stylingConstants } from '@/lib/constants/themeConstants';

const defaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm: React.FC = () => {
  const mutation: UseMutationResult<
    ISignUpResponse,
    IReactQueryError,
    ISignUpRequest
  > = useMutation({
    mutationFn: signUp,
  });

  const { handleSubmit, reset, control } = useForm<
    z.infer<typeof SignUpFormValidation>
  >({
    resolver: zodResolver(SignUpFormValidation),
    defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof SignUpFormValidation>) => {
    try {
      await mutation.mutateAsync({
        username: data.name,
        email: data.email,
        password: data.password,
      });
      reset();
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 10000,
      });
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
        Success. Please, check your email inbox and confirm your registration.
        You can close this tab
      </Alert>
    );
  }

  return (
    <>
      <Box
        component="form"
        sx={{
          m: '40px 0 16px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <ControlledInput
          name="name"
          control={control}
          label="Name"
          required
          placeholder="Hayman Andrews"
        />
        <ControlledInput
          name="email"
          control={control}
          label="Email"
          required
          placeholder="example@mail.com"
        />
        <ControlledInput
          name="password"
          control={control}
          label="Password"
          required
          placeholder="at least 8 characters"
          type="password"
        />
        <ControlledInput
          name="confirmPassword"
          control={control}
          label="Confirm Password"
          required
          placeholder="at least 8 characters"
          type="password"
        />
        <Button
          variant={'contained'}
          type="submit"
          disabled={mutation.isPending}
          sx={{
            mt: '66px',
            maxWidth: '436px',
            py: '14px',
            fontSize: '16px',
            borderRadius: '8px',
            '&.Mui-disabled': {
              border: '0',
            },
          }}
        >
          {mutation.isPending ? 'Loading...' : 'Sign Up'}
        </Button>
      </Box>
      <Box
        component="div"
        sx={{ display: 'flex', justifyContent: 'center', gap: '6px' }}
      >
        <Typography
          variant="body1"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          Already have an account?
        </Typography>
        <Link
          href="/auth/sign-in"
          style={{
            textDecoration: 'none',
            color: stylingConstants.palette.primary.main,
          }}
        >
          <Typography
            variant="body1"
            color={stylingConstants.palette.primary.main}
            sx={{
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Log in
          </Typography>
        </Link>
      </Box>
    </>
  );
};

export default SignUpForm;
