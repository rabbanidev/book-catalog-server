"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludeSelect = void 0;
const excludeSelect = (obj, keys) => {
    return Object.fromEntries(Object.entries(obj).filter(([key]) => !keys.includes(key)));
};
exports.excludeSelect = excludeSelect;
