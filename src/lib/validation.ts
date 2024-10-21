import { z } from 'zod';

export const SignUpFormValidation = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, 'Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be at most 50 characters'),
    email: z
      .string()
      .trim()
      .min(1, 'Email is required')
      .email('Invalid email address (ex. johndoe@gmail.com)'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must be at most 20 characters'),
    confirmPassword: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must be at most 20 characters'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const LogInFormValidation = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Invalid email address (ex. johndoe@gmail.com)'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must be at most 20 characters'),
  rememberMe: z.boolean(),
});

export const ResetPasswordValidation = z
  .object({
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must be at most 20 characters'),
    passwordConfirmation: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must be at most 20 characters'),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  });

export const ForgotPasswordValidation = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Invalid email address (ex. johndoe@gmail.com)'),
});

export const OrderValidation = z.object({
  promocode: z
    .string()
    .min(3, 'Promocode must be at least 3 characters')
    .max(20, 'Promocode must be at most 20 characters')
    .or(z.literal('')),
});

export const UpdateProfileValidation = z.object({
  firstName: z
    .string()
    .trim()
    .pipe(z.string().min(2, 'Name must be at least 2 characters')),
  lastName: z.string(),
  email: z.string().email('Invalid email address (ex. johndoe@gmail.com)'),
  phoneNumber: z
    .string()
    .refine(val => val === '' || /^\+?[1-9]\d{1,14}$/.test(val), {
      message: 'Invalid phone number format (ex. +380997272000)',
    })
    .optional(),
});

const MAX_FILE_SIZE = 5;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

export const avatarValidation = z.object({
  avatar: z
    .custom<FileList>()
    .optional()
    .refine(files => {
      return Array.from(files ?? []).every(
        file => sizeInMB(file.size) <= MAX_FILE_SIZE,
      );
    }, `File size should be less than ${MAX_FILE_SIZE}MB`)
    .refine(files => {
      return Array.from(files ?? []).every(file =>
        ACCEPTED_IMAGE_TYPES.includes(file.type),
      );
    }, 'Only these types are allowed: .jpg, .jpeg, .png, .webp'),
});

export const AddProductFormSchema = z.object({
  price: z.coerce
    .number()
    .positive('Price must be positive')
    .max(999999.99, 'Price must be lower than 1,000,000.00'),
  gender: z.number().positive('Gender is required'),
  brand: z.number().positive('Brand is required'),
  color: z.number().positive('Color is required'),
  name: z.string().trim().min(1, 'Name is required'),
  images: z.array(z.number()).min(1, 'You need to upload at least one image'),
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

export const CheckoutFormValidation = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(50, 'Name must be at most 50 characters'),
  surname: z
    .string()
    .trim()
    .min(1, 'Surname is required')
    .max(50, 'Surname must be at most 50 characters'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Invalid email address (ex. johndoe@gmail.com)'),
  phone: z
    .string()
    .trim()
    .min(1, 'Phone number is required')
    .refine(val => val === '' || /^\+?[1-9]\d{1,14}$/.test(val), {
      message: 'Invalid phone number format (ex. +380997272000)',
    }),
  country: z.string().trim().min(1, 'Country is required'),
  city: z.string().trim().min(1, 'City is required'),
  state: z.string().trim().min(1, 'State is required'),
  zipCode: z
    .string()
    .trim()
    .min(5, 'Zip code must be at least 5 digits')
    .regex(
      /^\d{5,10}$/,
      'Zip code must contain only digits and be 5-10 digits long',
    ),
  address: z
    .string()
    .trim()
    .min(1, 'Address is required')
    .max(100, 'Address must be at most 100 characters'),
});

export type AddProductFormData = z.infer<typeof AddProductFormSchema>;
