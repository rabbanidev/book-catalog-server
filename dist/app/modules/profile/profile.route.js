"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const enum_1 = require("../../../enum/enum");
const profile_controller_1 = require("./profile.controller");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(enum_1.ENUM_USER_ROLE.ADMIN, enum_1.ENUM_USER_ROLE.CUSTOMER), profile_controller_1.ProfileController.getProfile);
exports.ProfileRoutes = router;
