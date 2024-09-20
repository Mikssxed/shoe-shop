import { z } from 'zod';

export const SignUpFormValidation = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be at most 50 characters'),
    email: z.string().email('Invalid email address (ex. johndoe@gmail.com)'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must be at most 20 characters'),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must be at most 20 characters'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const LogInFormValidation = z.object({
  email: z.string().email('Invalid email address (ex. johndoe@gmail.com)'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must be at most 20 characters'),
  rememberMe: z.boolean(),
});

export const ResetPasswordValidation = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must be at most 20 characters'),
    passwordConfirmation: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must be at most 20 characters'),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  });

export const ForgotPasswordValidation = z.object({
  email: z.string().email('Invalid email address (ex. johndoe@gmail.com)'),
});

export const OrderValidation = z.object({
  promocode: z
    .string()
    .min(3, 'Promocode must be at least 3 characters')
    .max(20, 'Promocode must be at most 20 characters'),
});

export const UpdateProfileValidation = z.object({
  firstName: z.string(),
  lastName: z.string(),
  // TODO: make this a proper phone number validation
  phoneNumber: z
    .string()
    .min(10, { message: 'Must be a valid mobile number' })
    .max(14, { message: 'Must be a valid mobile number' }),
});
