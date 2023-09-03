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
exports.AuthService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const exclude_1 = require("../../../shared/exclude");
const auth_utils_1 = require("./auth.utils");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const jwtHelpers_1 = require("../../../helper/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const signUp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exitUser = yield auth_utils_1.AuthUtils.getUser(payload.email);
    if (exitUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Already registered user!');
    }
    const createdUser = yield prisma_1.default.user.create({
        data: payload,
    });
    const result = (0, exclude_1.excludeSelect)(createdUser, ['password']);
    return result;
});
const signIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exitUser = yield auth_utils_1.AuthUtils.getUser(payload.email);
    if (!exitUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User not found!');
    }
    // Compared password
    if (payload.password !== (exitUser === null || exitUser === void 0 ? void 0 : exitUser.password)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Password does't match!");
    }
    const token = jwtHelpers_1.jwtHelpers.generateToken({
        userId: exitUser.id,
        role: exitUser.role,
    }, config_1.default.jwt.access_secret, config_1.default.jwt.access_secret_expires_in);
    return {
        token,
    };
});
exports.AuthService = {
    signUp,
    signIn,
};
