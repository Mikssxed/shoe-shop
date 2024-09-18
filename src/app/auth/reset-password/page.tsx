import Link from "next/link";
import { Box, Typography } from "@mui/material";

import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import { stylingConstants } from "@/lib/constants/themeConstants";

export default function ResetPassword() {
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
          href="/auth/sign-in"
          style={{
            textDecorationLine: "none",
            color: stylingConstants.palette.text.secondary,
          }}
        >
          Back to log in
        </Link>
      </Typography>
    </Box>
  );
}
