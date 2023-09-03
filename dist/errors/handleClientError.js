"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    var _a;
    const statusCode = 400;
    let errors = [];
    let message = '';
    if (error.code === 'P2025') {
        message = ((_a = error.meta) === null || _a === void 0 ? void 0 : _a.cause) || 'Record not found!';
        errors = [
            {
                path: '',
                message: message,
            },
        ];
    }
    if (error.code === 'P2003') {
        if (error.message.includes('delete()` invocation:')) {
            message = 'Delete failed!';
            errors = [
                {
                    path: '',
                    message: message,
                },
            ];
        }
    }
    return {
        statusCode,
        message,
        errorMessages: errors,
    };
};
exports.default = handleCastError;
