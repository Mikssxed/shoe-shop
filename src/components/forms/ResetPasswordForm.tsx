"use client";

import { Box, Button } from "@mui/material";
import { Input } from "@/components/ui";

const ResetPasswordForm = () => {
  return (
    <Box
      component="form"
      sx={{
        margin: "40px 0 16px 0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <Input
          label="Password"
          required
          inputProps={{
            placeholder: "at least 8 characters",
            type: "password",
          }}
        />
        <Input
          label="Confirm Password"
          required
          inputProps={{
            placeholder: "at least 8 characters",
            type: "password",
          }}
        />
      </Box>

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

export default ResetPasswordForm;
