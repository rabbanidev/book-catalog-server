import { UserRole } from '@prisma/client';
import { z } from 'zod';

const createUserWithZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required!',
    }),
    email: z
      .string({
        required_error: 'Email is required!',
      })
      .email({ message: 'Please enter a valid email!' }),
    password: z.string({
      required_error: 'Password is required!',
    }),
    role: z.enum([...Object.values(UserRole)] as [string, ...string[]], {
      required_error: 'Role is required',
    }),
    contactNo: z.string({
      required_error: 'Contact NO is required!',
    }),
    address: z.string({
      required_error: 'Address is required!',
    }),
    profileImg: z.string({
      required_error: 'Profile image is required!',
    }),
  }),
});

export const AuthValidation = {
  createUserWithZodSchema,
};
