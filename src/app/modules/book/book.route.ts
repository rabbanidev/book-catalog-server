import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enum/enum';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';

const router = express.Router();

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.createBookWithZodSchema),
  BookController.createBook
);

router.get('/', BookController.getAllBooks);

export const BookRoutes = router;
