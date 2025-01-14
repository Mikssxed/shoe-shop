import { Box, Typography } from '@mui/material';

import SignInForm from '@/components/forms/SignInForm';

export default function SignIn() {
  return (
    <Box marginTop="40px">
      <Typography variant="h1">Welcome back</Typography>
      <Typography variant="body1" marginTop="16px">
        Please enter your details to log into your account.
      </Typography>

      <SignInForm />
    </Box>
  );
}
