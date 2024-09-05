"use client";

import { Box, Typography } from "@mui/material";

import SignUpForm from "@/components/forms/SignUpForm";
import { useRedirectIfAuth } from "@/hooks";

export default function SignUp() {
  useRedirectIfAuth();
  
  return (
    <Box marginTop="40px">
      <Typography variant="h1" sx={{ lineHeight: "53px", fontSize: "45px" }}>
        Create an account
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
        Create an account to get an easy access to your dream shopping
      </Typography>
      <SignUpForm />
    </Box>
  );
}
