'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import ControlledCheckbox from '@/components/common/ControlledCheckbox';
import ControlledInput from '@/components/common/ControlledInput';
import { useSignIn } from '@/hooks';
import { LogInFormValidation } from '@/lib/validation';
import { stylingConstants } from '@/lib/constants/themeConstants';
import BaseButton from '../ui/BaseButton';
import { buttonStyles } from '@/styles/commonStyles';
import { enqueueSnackbar } from 'notistack';

const defaultValues = {
  email: '',
  password: '',
  rememberMe: false,
};

const SignInForm: React.FC = () => {
  const { handleSubmit, control } = useForm<
    z.infer<typeof LogInFormValidation>
  >({
    resolver: zodResolver(LogInFormValidation),
    defaultValues,
  });

  const { isPending, mutateAsync } = useSignIn();

  const onSubmit = async (data: z.infer<typeof LogInFormValidation>) => {
    try {
      await mutateAsync({
        identifier: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });
    } catch (error: any) {
      const errorMessage =
        error?.response!?.data?.error?.message?.replace(
          'identifier',
          'email',
        ) || 'Wrong credentials';
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        autoHideDuration: 10000,
      });
    }
  };

  return (
    <>
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
          component="div"
          sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
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
        </Box>
        <Box
          component="div"
          sx={{
            mt: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <ControlledCheckbox
            label="Remember me"
            control={control}
            name="rememberMe"
          />
          <Typography variant="body2">
            <Link
              href="/auth/forgot-password"
              style={{
                textDecoration: 'none',
                color: stylingConstants.palette.primary.main,
              }}
            >
              Forgot password?
            </Link>
          </Typography>
        </Box>
        <BaseButton
          type="submit"
          disabled={isPending}
          sx={{
            ...buttonStyles.authBtn,
            ...buttonStyles.disabledBtn,
            mt: '56px',
          }}
        >
          {isPending ? 'Loading...' : 'Sign In'}
        </BaseButton>
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
          Don’t have an account?
        </Typography>
        <Typography
          variant="body1"
          color={stylingConstants.palette.primary.main}
          sx={{
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          <Link
            href="/auth/sign-up"
            style={{
              textDecoration: 'none',
              color: stylingConstants.palette.primary.main,
            }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default SignInForm;
