import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getProfile = async (authUserId: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: authUserId,
    },
  });
  return result;
};

export const ProfileService = {
  getProfile,
};
