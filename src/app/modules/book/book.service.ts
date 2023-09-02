import { Book, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helper/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IBookFilters } from './book.interface';
import {
  bookRelationalFields,
  bookRelationalMapperFields,
  bookSearchableFields,
} from './book.constant';

const createBook = async (payload: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data: payload,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { search, minPrice, maxPrice, ...filtersData } = filters;

  const andCondition = [];

  //Seacrh implementation
  if (search) {
    andCondition.push({
      OR: bookSearchableFields.map((field) => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  // Minimum and maximum price wise filtering
  if (minPrice || maxPrice) {
    andCondition.push({
      price: {
        gte: Number(minPrice) || 0,
        lte: Number(maxPrice) || Infinity,
      },
    });
  }

  // Filters implementation
  if (Object.keys(filtersData).length > 0) {
    andCondition.push({
      AND: Object.entries(filtersData).map(([field, value]) => {
        if (bookRelationalFields.includes(field)) {
          return {
            [bookRelationalMapperFields[field]]: {
              id: (filtersData as any)[field],
            },
          };
        } else {
          return {
            [field]: {
              equals: value,
            },
          };
        }
      }),
    });
  }

  const whereCondition: Prisma.BookWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  // Paginations implementation
  const { page, size, skip, sortConditions } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await prisma.book.findMany({
    where: whereCondition,
    skip,
    take: size,
    orderBy: sortConditions,
    include: {
      category: true,
    },
  });

  // Total documents
  const total = await prisma.book.count();

  // Total pages
  const totalPage = paginationHelpers.calculateTotalPage(total, size);

  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
};

export const BookService = {
  createBook,
  getAllBooks,
};
