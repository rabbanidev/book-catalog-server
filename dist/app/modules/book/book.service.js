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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelpers_1 = require("../../../helper/paginationHelpers");
const book_constant_1 = require("./book.constant");
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({
        data: payload,
        include: {
            category: true,
        },
    });
    return result;
});
const getAllBooks = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, minPrice, maxPrice } = filters, filtersData = __rest(filters, ["search", "minPrice", "maxPrice"]);
    const andCondition = [];
    //Seacrh implementation
    if (search) {
        andCondition.push({
            OR: book_constant_1.bookSearchableFields.map((field) => ({
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
                if (book_constant_1.bookRelationalFields.includes(field)) {
                    return {
                        [book_constant_1.bookRelationalMapperFields[field]]: {
                            id: filtersData[field],
                        },
                    };
                }
                else {
                    return {
                        [field]: {
                            equals: value,
                        },
                    };
                }
            }),
        });
    }
    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};
    // Paginations implementation
    const { page, size, skip, sortConditions } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = yield prisma_1.default.book.findMany({
        where: whereCondition,
        skip,
        take: size,
        orderBy: sortConditions,
        include: {
            category: true,
        },
    });
    // Total documents
    const total = yield prisma_1.default.book.count({
        where: whereCondition,
    });
    // Total pages
    const totalPage = paginationHelpers_1.paginationHelpers.calculateTotalPage(total, size);
    return {
        meta: {
            page,
            size,
            total,
            totalPage,
        },
        data: result,
    };
});
const getBooksByCategory = (categoryId, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Paginations implementation
    const { page, size, skip, sortConditions } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = yield prisma_1.default.book.findMany({
        where: {
            categoryId,
        },
        skip,
        take: size,
        orderBy: sortConditions,
        include: {
            category: true,
        },
    });
    // Total documents
    const total = yield prisma_1.default.book.count({
        where: {
            categoryId,
        },
    });
    // Total pages
    const totalPage = paginationHelpers_1.paginationHelpers.calculateTotalPage(total, size);
    return {
        meta: {
            page,
            size,
            total,
            totalPage,
        },
        data: result,
    };
});
const getBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
            reviewAndRatins: true,
        },
    });
    return result;
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.update({
        where: {
            id,
        },
        data: payload,
        include: {
            category: true,
        },
    });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.delete({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
    return result;
});
exports.BookService = {
    createBook,
    getAllBooks,
    getBooksByCategory,
    getBook,
    updateBook,
    deleteBook,
};
