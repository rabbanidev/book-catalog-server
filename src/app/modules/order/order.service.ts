import { Order, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createOrder = async (
  payload: Prisma.OrderCreateInput,
  authUserId: string
): Promise<Order> => {
  const result = await prisma.order.create({
    data: {
      ...payload,
      user: {
        connect: { id: authUserId },
      },
    },
  });

  return result;
};

export const OrderService = {
  createOrder,
};
