import { UserRole } from '@prisma/client';
import { z } from 'zod';

const updateUserWithZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z
      .string()
      .email({ message: 'Please enter a valid email!' })
      .optional(),
    password: z.string().optional(),
    role: z
      .enum([...Object.values(UserRole)] as [string, ...string[]])
      .optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

export const UserValidation = {
  updateUserWithZodSchema,
};
