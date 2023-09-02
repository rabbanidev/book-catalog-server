import { Order, OrderedBook } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { GlobalUtils } from '../../../shared/utils';
import { IOrderCreateRequest } from './order.interface';

// const createOrder = async (
//   payload: Prisma.OrderCreateInput,
//   authUserId: string
// ): Promise<Order> => {
//   const result = await prisma.order.create({
//     data: {
//       ...payload,
//       user: {
//         connect: { id: authUserId },
//       },
//     },
//   });

//   return result;
// };

const createOrder = async (
  payload: IOrderCreateRequest,
  authUserId: string
): Promise<Order | null> => {
  const { orderedBooks } = payload;

  const createdOrder = await prisma.$transaction(async (tx) => {
    // Create order
    const newOrder = (await tx.order.create({
      data: {
        userId: authUserId,
      },
    })) as Order;

    // Create ordered book
    await GlobalUtils.asyncForEach(
      orderedBooks,
      async (orderBook: OrderedBook) => {
        await tx.orderedBook.create({
          data: {
            bookId: orderBook.bookId,
            quantity: orderBook.quantity,
            orderId: newOrder.id,
          },
        });
      }
    );

    return newOrder;
  });

  if (createdOrder) {
    const result = await prisma.order.findUnique({
      where: {
        id: createdOrder.id,
      },
      include: {
        orderedBooks: {
          select: {
            bookId: true,
            quantity: true,
          },
        },
      },
    });

    return result;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create order!');
};

export const OrderService = {
  createOrder,
};
