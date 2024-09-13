"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ControlledInput from "@/components/common/ControlledInput";
import {
  IReactQueryError,
  IResetPasswordRequest,
  IResetPasswordResponse,
} from "@/lib/types";
import { ResetPasswordValidation } from "@/lib/validation";
import { resetPassword } from "@/tools";
import { Alert, Box, Button } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";

const defaultValues = {
  password: "",
  passwordConfirmation: "",
};

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const code: string | null = searchParams.get("code");

  const mutation: UseMutationResult<
    IResetPasswordResponse,
    IReactQueryError,
    IResetPasswordRequest
  > = useMutation({
    mutationFn: resetPassword,
  });

  const { handleSubmit, control } = useForm<
    z.infer<typeof ResetPasswordValidation>
  >({
    resolver: zodResolver(ResetPasswordValidation),
    defaultValues,
  });

  // TODO: Inform user with notification in case of an error
  const onSubmit = async (data: z.infer<typeof ResetPasswordValidation>) => {
    try {
      await mutation.mutateAsync({
        ...data,
        code: code,
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Something went wrong!", {
        variant: "error",
        autoHideDuration: 10000,
      });
    }
  };

  // TODO: Replace this with a success and redirecting... notification
  if (mutation.isSuccess) {
    return (
      <Alert
        severity="success"
        sx={{
          maxWidth: "436px",
          paddingY: "14px",
          marginY: "14px",
          fontSize: "16px",
          borderRadius: "8px",
        }}
      >
        Password reset successful.
      </Alert>
    );
  }

  return (
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
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <ControlledInput
          name="password"
          control={control}
          label="Password"
          required
          placeholder="at least 8 characters"
          type="password"
        />
        <ControlledInput
          name="passwordConfirmation"
          control={control}
          label="Confirm Password"
          required
          placeholder="at least 8 characters"
          type="password"
        />
      </Box>

      <Button
        variant="contained"
        type="submit"
        disabled={mutation.isPending}
        sx={{
          marginTop: "20px",
          maxWidth: "436px",
          paddingY: "14px",
          fontSize: "16px",
          borderRadius: "8px",
          "&.Mui-disabled": {
            border: "0",
          },
        }}
      >
        {mutation.isPending ? "Loading..." : "Reset Password"}
      </Button>
    </Box>
  );
};

export default ResetPasswordForm;
