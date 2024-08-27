import SignUpForm from "@/components/forms/SignUpForm";
import { Box, Link as MaterialLink, Typography } from "@mui/material";

export default function SignUp() {
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
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        Already have an account?{" "}
        <MaterialLink href="/log-in" underline="hover">
          Log in
        </MaterialLink>
      </Typography>
    </Box>
  );
}
