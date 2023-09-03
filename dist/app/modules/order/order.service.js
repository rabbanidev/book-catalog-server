"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const utils_1 = require("../../../shared/utils");
const enum_1 = require("../../../enum/enum");
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
const createOrder = (payload, authUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderedBooks } = payload;
    const createdOrder = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // Create order
        const newOrder = (yield tx.order.create({
            data: {
                userId: authUserId,
            },
        }));
        // Create ordered book
        yield utils_1.GlobalUtils.asyncForEach(orderedBooks, (orderBook) => __awaiter(void 0, void 0, void 0, function* () {
            yield tx.orderedBook.create({
                data: {
                    bookId: orderBook.bookId,
                    quantity: orderBook.quantity,
                    orderId: newOrder.id,
                },
            });
        }));
        return newOrder;
    }));
    if (createdOrder) {
        const result = yield prisma_1.default.order.findUnique({
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
    throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create order!');
});
const getAllOrders = (authUser) => __awaiter(void 0, void 0, void 0, function* () {
    if (authUser.role === enum_1.ENUM_USER_ROLE.CUSTOMER) {
        const result = yield prisma_1.default.order.findMany({
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
    const result = yield prisma_1.default.order.findMany({
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
});
const getOrder = (id, authUser) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, userId } = authUser;
    let result = null;
    if (role === enum_1.ENUM_USER_ROLE.CUSTOMER) {
        result = yield prisma_1.default.order.findUnique({
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
    }
    else {
        result = yield prisma_1.default.order.findUnique({
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
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    getOrder,
};
