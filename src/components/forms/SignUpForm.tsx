"use client";

import { Box, Button } from "@mui/material";
import { Input } from "@/components/ui";

const SignUpForm = () => {
  return (
    <Box
      component="form"
      sx={{
        margin: "40px 0 16px 0",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Input
        label="Name"
        required
        inputProps={{ placeholder: "Hayman Andrews" }}
      />
      <Input
        label="Email"
        required
        inputProps={{ placeholder: "example@mail.com" }}
      />
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
      <Button
        variant="contained"
        type="submit"
        sx={{
          marginTop: "66px",
          maxWidth: "436px",
          paddingY: "14px",
          fontSize: "16px",
          borderRadius: "8px",
        }}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUpForm;
