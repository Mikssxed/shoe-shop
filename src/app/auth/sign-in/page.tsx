import { Box, Typography } from "@mui/material";

import SignInForm from "@/components/forms/SignInForm";

export default function SignIn() {
  return (
    <Box marginTop="40px">
      <Typography variant="h1" sx={{ lineHeight: "53px", fontSize: "45px" }}>
        Welcome back
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontWeight: "300",
          fontSize: "15px",
          lineHeight: "18px",
          marginTop: "16px",
        }}
      >
        Please enter your details to log into your account.
      </Typography>

      <SignInForm />
    </Box>
  );
}
