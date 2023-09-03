import { z } from 'zod';

const createReviewWithZod = z.object({
  body: z.object({
    review: z.string({ required_error: 'Review is required!' }),
    rating: z.number({ required_error: 'Rating is required!' }).min(1).max(5),
  }),
});

export const ReviewValidation = {
  createReviewWithZod,
};
