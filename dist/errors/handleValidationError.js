"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (error) => {
    const errors = [
        {
            path: '',
            message: error.message,
        },
    ];
    const statusCode = 400;
    const message = 'Validation Error';
    const errorMessages = errors;
    return {
        statusCode,
        message,
        errorMessages,
    };
};
exports.default = handleValidationError;
