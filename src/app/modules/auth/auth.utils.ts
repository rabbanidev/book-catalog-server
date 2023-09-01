import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getUser = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export const AuthUtils = {
  getUser,
};
