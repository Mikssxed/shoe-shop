"use client";

import { Box, Button } from "@mui/material";
import { Input } from "@/components/ui";

const ForgotPasswordForm = () => {
  return (
    <Box
      component="form"
      sx={{
        margin: "40px 0 16px 0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Input label="Email" inputProps={{ placeholder: "example@mail.com" }} />

      <Button
        variant="contained"
        type="submit"
        sx={{
          marginTop: "20px",
          maxWidth: "436px",
          paddingY: "14px",
          fontSize: "16px",
          borderRadius: "8px",
        }}
      >
        Reset Password
      </Button>
    </Box>
  );
};

export default ForgotPasswordForm;
