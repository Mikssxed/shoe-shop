"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Box, Button } from "@mui/material";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

import ControlledInput from "@/components/ControlledInput";
import { SignUpFormValidation } from "@/lib/validation";
import { IUserResponse, IReactQueryError, IUserPost } from "@/lib/types";
import { signUp } from "@/tools";

const defaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm: React.FC = () => {
  const mutation: UseMutationResult<
    IUserResponse,
    IReactQueryError,
    IUserPost
  > = useMutation({
    mutationFn: signUp,
  });

  const { handleSubmit, reset, control } = useForm<
    z.infer<typeof SignUpFormValidation>
  >({
    resolver: zodResolver(SignUpFormValidation),
    defaultValues,
  });

  const onSubmit = (data: z.infer<typeof SignUpFormValidation>) => {
    try {
      mutation.mutateAsync({
        username: data.name,
        email: data.email,
        password: data.password,
      });
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      redirect("/log-in");
    }
  }, [mutation.isSuccess]);

  return (
    <Box
      component="form"
      sx={{
        margin: "40px 0 16px 0",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ControlledInput
        name="name"
        control={control}
        label="Name"
        required
        placeholder="Hayman Andrews"
      />
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
      <ControlledInput
        name="confirmPassword"
        control={control}
        label="Confirm Password"
        required
        placeholder="at least 8 characters"
        type="password"
      />

      {mutation.isError && (
        <Box
          sx={{
            maxWidth: "436px",
          }}
        >
          <Alert
            severity="error"
            sx={{
              paddingY: "14px",
              fontSize: "16px",
              borderRadius: "8px",
            }}
          >
            {mutation.error?.response?.data?.error?.message}
          </Alert>
        </Box>
      )}

      <Button
        variant={"contained"}
        type="submit"
        disabled={mutation.isPending}
        sx={{
          marginTop: mutation.isError ? "0px" : "66px",
          maxWidth: "436px",
          paddingY: "14px",
          fontSize: "16px",
          borderRadius: "8px",
          "&.Mui-disabled": {
            border: "0",
          },
        }}
      >
        {mutation.isPending ? "Loading..." : "Sign Up"}
      </Button>
    </Box>
  );
};

export default SignUpForm;
