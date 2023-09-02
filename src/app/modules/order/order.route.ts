import express from 'express';
import { OrderController } from './order.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enum/enum';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidation } from './order.validation';

const router = express.Router();

router.post(
  '/create-order',
  auth(ENUM_USER_ROLE.CUSTOMER),
  validateRequest(OrderValidation.createOrderWithZodSchema),
  OrderController.createOrder
);

export const OrderRoutes = router;
