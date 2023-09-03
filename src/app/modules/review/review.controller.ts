import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ReviewService } from './review.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ReviewAndRating } from '@prisma/client';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.createReview(
    req.params.bookId,
    req.body,
    req.user.userId
  );

  sendResponse<ReviewAndRating>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews create successfully!',
    data: result,
  });
});

const getReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getReview(req.params.bookId);

  sendResponse<ReviewAndRating>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews fetched successfully!',
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getReview,
};
