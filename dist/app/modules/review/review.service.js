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
exports.ReviewService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createReview = (bookId, payload, authUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const exitReview = yield prisma_1.default.reviewAndRating.findFirst({
        where: {
            bookId,
            userId: authUserId,
        },
    });
    if (exitReview) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'ALready reviewed!');
    }
    const result = yield prisma_1.default.reviewAndRating.create({
        data: Object.assign(Object.assign({}, payload), { bookId, userId: authUserId }),
    });
    return result;
});
const getReview = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.reviewAndRating.findFirst({
        where: {
            bookId,
        },
    });
    return result;
});
exports.ReviewService = {
    createReview,
    getReview,
};
