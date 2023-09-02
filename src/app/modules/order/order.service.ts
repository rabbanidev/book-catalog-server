import { Order, OrderedBook } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { GlobalUtils } from '../../../shared/utils';
import { IOrderCreateRequest } from './order.interface';
import { JwtPayload } from 'jsonwebtoken';
import { ENUM_USER_ROLE } from '../../../enum/enum';

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

const getAllOrders = async (authUser: JwtPayload): Promise<Order[]> => {
  if (authUser.role === ENUM_USER_ROLE.CUSTOMER) {
    const result = await prisma.order.findMany({
      where: {
        userId: authUser.userId,
      },
      include: {
        orderedBooks: {
          select: {
            quantity: true,
            bookId: true,
            book: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return result;
  }

  const result = await prisma.order.findMany({
    include: {
      orderedBooks: {
        select: {
          quantity: true,
          bookId: true,
          book: true,
        },
      },
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return result;
};

const getOrder = async (
  id: string,
  authUser: JwtPayload
): Promise<Order | null> => {
  const { role, userId } = authUser;

  let result = null;
  if (role === ENUM_USER_ROLE.CUSTOMER) {
    result = await prisma.order.findUnique({
      where: {
        id,
        userId,
      },
      include: {
        orderedBooks: {
          select: {
            quantity: true,
            bookId: true,
            book: true,
          },
        },
      },
    });
  } else {
    result = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        orderedBooks: {
          select: {
            quantity: true,
            bookId: true,
            book: true,
          },
        },
        user: true,
      },
    });
  }

  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getOrder,
};
