import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enum/enum';
import { ReviewController } from './review.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.post(
  '/:bookId',
  auth(ENUM_USER_ROLE.CUSTOMER),
  validateRequest(ReviewValidation.createReviewWithZod),
  ReviewController.createReview
);

router.get('/:bookId', ReviewController.getReview);

export const ReviewRoutes = router;
