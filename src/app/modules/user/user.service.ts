import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { excludeSelect } from '../../../shared/exclude';

const getAllUsers = async (): Promise<Partial<User>[]> => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const getUser = async (id: string): Promise<Partial<User> | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  const result = user && excludeSelect(user, ['password']);

  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<Partial<User>> => {
  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });

  const result = updatedUser && excludeSelect(updatedUser, ['password']);

  return result;
};

const deleteUser = async (id: string): Promise<Partial<User> | null> => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  const result = user && excludeSelect(user, ['password']);

  return result;
};

export const UserService = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
