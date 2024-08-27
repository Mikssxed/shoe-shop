import { Box, Link as MaterialLink, Typography } from "@mui/material";
import LogInForm from "@/components/forms/LogInForm";

export default function Login() {
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
      <LogInForm />
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        Don’t have an account?{" "}
        <MaterialLink href="/sign-up" underline="hover">
          Sign up
        </MaterialLink>
      </Typography>
    </Box>
  );
}
