"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ControlledCheckbox from "@/components/common/ControlledCheckbox";
import ControlledInput from "@/components/common/ControlledInput";
import { useSignIn } from "@/hooks";
import { constants } from "@/lib/constants";
import { LogInFormValidation } from "@/lib/validation";

const defaultValues = {
  email: "",
  password: "",
  rememberMe: false,
};

const SignInForm: React.FC = () => {
  const { handleSubmit, control } = useForm<
    z.infer<typeof LogInFormValidation>
  >({
    resolver: zodResolver(LogInFormValidation),
    defaultValues,
  });

  // TODO: implement 'remember me' checkbox using

  const { mutate, isPending, isError } = useSignIn();

  const onSubmit = (data: z.infer<typeof LogInFormValidation>) => {
    try {
      mutate({
        identifier: data.email,
        password: data.password,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          margin: "40px 0 16px 0",
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box
          component="div"
          sx={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          <ControlledInput
            name="email"
            control={control}
            label="Email"
            required
            placeholder="example@mail.com"
          />
          <ControlledInput
            name="password"
            control={control}
            label="Password"
            required
            placeholder="at least 8 characters"
            type="password"
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
          <ControlledCheckbox
            label="Remember me"
            control={control}
            name="rememberMe"
          />
          <Typography variant="body1" fontWeight={300}>
            <Link
              href="/auth/forgot-password"
              style={{
                textDecoration: "none",
                color: constants.palette.primary.main,
              }}
            >
              Forgot password?
            </Link>
          </Typography>
        </Box>

        {isError && (
          <Box
            sx={{
              maxWidth: "436px",
            }}
          >
            <Alert
              severity="error"
              sx={{
                marginTop: "24px",
                paddingY: "14px",
                fontSize: "16px",
                borderRadius: "8px",
              }}
            >
              {/* TODO: show error message */}
              {"Error"}
            </Alert>
          </Box>
        )}

        <Button
          variant="contained"
          type="submit"
          sx={{
            marginTop: isError ? "24px" : "56px",
            maxWidth: "436px",
            paddingY: "14px",
            fontSize: "16px",
            borderRadius: "8px",
          }}
        >
          {isPending ? "Loading..." : "Sign In"}
        </Button>
      </Box>
      <Box
        component="div"
        sx={{ display: "flex", justifyContent: "center", gap: "6px" }}
      >
        <Typography
          variant="body1"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          Don’t have an account?
        </Typography>
        <Typography
          variant="body1"
          color={constants.palette.primary.main}
          sx={{
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          <Link
            href="/auth/sign-up"
            style={{
              textDecoration: "none",
              color: constants.palette.primary.main,
            }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default SignInForm;
