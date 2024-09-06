import { z } from "zod";

export const SignUpFormValidation = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address (ex. johndoe@gmail.com)"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const LogInFormValidation = z.object({
  email: z.string().email("Invalid email address (ex. johndoe@gmail.com)"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters"),
  rememberMe: z.boolean(),
});

export const ResetPasswordValidation = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const ForgotPasswordValidation = z.object({
  email: z.string().email("Invalid email address (ex. johndoe@gmail.com)"),
});
