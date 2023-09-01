import { z } from 'zod';

const createCategoryWithZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Category is required!',
    }),
  }),
});

const updateCategoryWithZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const CategoryValidation = {
  createCategoryWithZodSchema,
  updateCategoryWithZodSchema,
};
