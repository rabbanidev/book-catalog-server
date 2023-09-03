"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = require("../modules/auth/auth.route");
const book_route_1 = require("../modules/book/book.route");
const category_route_1 = require("../modules/category/category.route");
const order_route_1 = require("../modules/order/order.route");
const profile_route_1 = require("../modules/profile/profile.route");
const review_route_1 = require("../modules/review/review.route");
const user_route_1 = require("../modules/user/user.route");
const modulesRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/categories',
        route: category_route_1.CategoryRoutes,
    },
    {
        path: '/books',
        route: book_route_1.BookRoutes,
    },
    {
        path: '/orders',
        route: order_route_1.OrderRoutes,
    },
    {
        path: '/profile',
        route: profile_route_1.ProfileRoutes,
    },
    {
        path: '/reviews',
        route: review_route_1.ReviewRoutes,
    },
];
exports.default = modulesRoutes;
