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
    .max(20, 'Promocode must be at most 20 characters')
    .or(z.literal('')),
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

export const AddProductFormSchema = z.object({
  price: z.coerce.number().positive('Price must be positive'),
  gender: z.number().positive('Gender is required'),
  brand: z.number().positive('Brand is required'),
  color: z.number().positive('Color is required'),
  name: z.string().trim().min(1, 'Name is required'),
  images: z
    .array(z.instanceof(File).or(z.number()))
    .min(1, 'You need to upload at least one image'),
  description: z
    .string()
    .trim()
    .min(1, 'Description is required')
    .max(300, 'Do not exceed 300 characters'),
  sizes: z
    .array(z.number())
    .transform(arr => arr.filter(num => num > 0))
    .refine(arr => arr.length > 0, {
      message: 'You need to pick at least one size',
    }),
  userID: z.string(),
  teamName: z.string().min(1, 'Team name is required'),
  categories: z
    .array(z.number())
    .transform(arr => arr.filter(num => num > 0))
    .refine(arr => arr.length > 0, {
      message: 'You need to pick at least one category',
    }),
});

export type AddProductFormData = z.infer<typeof AddProductFormSchema>;
