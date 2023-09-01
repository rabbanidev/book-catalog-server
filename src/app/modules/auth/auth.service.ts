import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { excludeSelect } from '../../../shared/exclude';
import { AuthUtils } from './auth.utils';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const signUp = async (payload: User) => {
  const exitUser = await AuthUtils.getUser(payload.email);

  if (exitUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already registered user!');
  }

  const createdUser = await prisma.user.create({
    data: payload,
  });

  const result = excludeSelect(createdUser, ['password']);

  return result;
};

export const AuthService = {
  signUp,
};
