import { z } from 'zod';

const createOrderWithZodSchema = z.object({
  body: z.object({
    orderedBooks: z
      .array(
        z.object({
          bookId: z.string({ required_error: 'Book id is required!' }),
          quantity: z.number({ required_error: 'Quantity is required!' }),
        }),
        {
          required_error: 'Ordered books is required!',
        }
      )
      .nonempty(),
  }),
});

export const OrderValidation = {
  createOrderWithZodSchema,
};
