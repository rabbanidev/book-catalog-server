"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const enum_1 = require("../../../enum/enum");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const order_validation_1 = require("./order.validation");
const router = express_1.default.Router();
router.post('/create-order', (0, auth_1.default)(enum_1.ENUM_USER_ROLE.CUSTOMER), (0, validateRequest_1.default)(order_validation_1.OrderValidation.createOrderWithZodSchema), order_controller_1.OrderController.createOrder);
router.get('/', (0, auth_1.default)(enum_1.ENUM_USER_ROLE.ADMIN, enum_1.ENUM_USER_ROLE.CUSTOMER), order_controller_1.OrderController.getAllOrders);
router.get('/:id', (0, auth_1.default)(enum_1.ENUM_USER_ROLE.ADMIN, enum_1.ENUM_USER_ROLE.CUSTOMER), order_controller_1.OrderController.getOrder);
exports.OrderRoutes = router;
