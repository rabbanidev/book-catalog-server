import { Book } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createBook = async (payload: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data: payload,
    include: {
      category: true,
    },
  });
  return result;
};

export const BookService = {
  createBook,
};
