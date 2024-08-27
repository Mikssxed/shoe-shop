"use client";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link as MaterialLink,
  Typography,
} from "@mui/material";
import { Input } from "@/components/ui";

const LogInForm = () => {
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
        component="div"
        sx={{ display: "flex", flexDirection: "column", gap: "24px" }}
      >
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
      </Box>
      <Box
        component="div"
        sx={{
          marginTop: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormControlLabel
          control={<Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 16 } }} />}
          label="Remember me"
          sx={{ fontSize: "15px" }}
        />
        <MaterialLink href="/forgot-password" underline="hover">
          <Typography variant="body1" color="primary" fontWeight={300}>
            Forgot password?
          </Typography>
        </MaterialLink>
      </Box>

      <Button
        variant="contained"
        type="submit"
        sx={{
          marginTop: "56px",
          maxWidth: "436px",
          paddingY: "14px",
          fontSize: "16px",
          borderRadius: "8px",
        }}
      >
        Sign In
      </Button>
    </Box>
  );
};

export default LogInForm;
