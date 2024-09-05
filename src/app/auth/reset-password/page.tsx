"use client";

import Link from "next/link";
import { Box, Typography, useTheme } from "@mui/material";

import ResetPasswordForm from "@/components/forms/ResetPasswordForm";

export default function ResetPassword() {
  const theme = useTheme();

  return (
    <Box marginTop="40px">
      <Typography variant="h1" sx={{ lineHeight: "53px", fontSize: "45px" }}>
        Reset password
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
        Please create new password here
      </Typography>

      <ResetPasswordForm />

      <Typography variant="body1" sx={{ textAlign: "center" }}>
        <Link
          href="/log-in"
          style={{
            textDecorationLine: "none",
            color: theme.palette.text.secondary,
          }}
        >
          Back to log in
        </Link>
      </Typography>
    </Box>
  );
}
