"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelpers = void 0;
const calculatePagination = (options) => {
    const page = Number(options.page) || 1;
    const size = Number(options.size) || 10;
    const skip = (page - 1) * size;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    return {
        page,
        size,
        skip,
        sortConditions,
    };
};
const calculateTotalPage = (total, size) => {
    let totalPage = 1;
    const divisor = total % size;
    if (divisor > 0) {
        totalPage = parseInt((total / size).toString()) + 1;
    }
    else {
        totalPage = total / size;
    }
    return totalPage;
};
exports.paginationHelpers = {
    calculatePagination,
    calculateTotalPage,
};
