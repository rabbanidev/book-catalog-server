import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { excludeSelect } from '../../../shared/exclude';
import { AuthUtils } from './auth.utils';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../../helper/jwtHelpers';
import config from '../../../config';

const signUp = async (payload: User): Promise<Partial<User>> => {
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

const signIn = async (payload: User): Promise<{ token: string }> => {
  const exitUser = await AuthUtils.getUser(payload.email);

  if (!exitUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!');
  }

  // Compared password
  if (payload.password !== exitUser?.password) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Password does't match!");
  }

  const token = jwtHelpers.generateToken(
    {
      userId: exitUser.id,
      role: exitUser.role,
    },
    config.jwt.access_secret as string,
    config.jwt.access_secret_expires_in as string
  );

  return {
    token,
  };
};

export const AuthService = {
  signUp,
  signIn,
};
