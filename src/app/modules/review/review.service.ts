import { ReviewAndRating } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createReview = async (
  bookId: string,
  payload: ReviewAndRating,
  authUserId: string
) => {
  const exitReview = await prisma.reviewAndRating.findFirst({
    where: {
      bookId,
      userId: authUserId,
    },
  });

  if (exitReview) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'ALready reviewed!');
  }

  const result = await prisma.reviewAndRating.create({
    data: {
      ...payload,
      bookId,
      userId: authUserId,
    },
  });

  return result;
};

const getReview = async (bookId: string) => {
  const result = await prisma.reviewAndRating.findFirst({
    where: {
      bookId,
    },
  });

  return result;
};

export const ReviewService = {
  createReview,
  getReview,
};
