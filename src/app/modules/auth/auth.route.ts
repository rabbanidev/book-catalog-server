import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidation.createUserWithZodSchema),
  AuthController.signUp
);

router.post(
  '/signin',
  validateRequest(AuthValidation.signinWithZodSchema),
  AuthController.signIn
);

export const AuthRoutes = router;
