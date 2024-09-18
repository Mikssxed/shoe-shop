import Link from "next/link";
import { Box, Typography } from "@mui/material";

import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import { constants } from "@/lib/constants";

export default function ForgotPassword() {
  return (
    <Box marginTop="40px">
      <Typography variant="h1" sx={{ lineHeight: "53px", fontSize: "45px" }}>
        Forgot password?
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
        Don’t worry, we’ll send you reset instructions.
      </Typography>

      <ForgotPasswordForm />

      <Typography variant="body1" sx={{ textAlign: "center" }}>
        <Link
          href="/auth/sign-in"
          style={{
            textDecorationLine: "none",
            color: constants.palette.text.secondary,
          }}
        >
          Back to log in
        </Link>
      </Typography>
    </Box>
  );
}
