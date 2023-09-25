"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, payload) => {
    const responseData = {
        success: payload.success,
        statusCode: payload.statusCode,
        message: payload.message || null,
        meta: payload.meta || null || undefined,
        data: payload.data,
        token: payload.token,
    };
    res.status(payload.statusCode).json(responseData);
};
exports.default = sendResponse;
