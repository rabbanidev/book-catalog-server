"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRelationalMapperFields = exports.bookRelationalFields = exports.bookSearchableFields = exports.bookFilterableFields = void 0;
exports.bookFilterableFields = [
    'search',
    'minPrice',
    'maxPrice',
    'category',
];
exports.bookSearchableFields = ['title', 'author', 'genre'];
exports.bookRelationalFields = ['category'];
exports.bookRelationalMapperFields = {
    category: 'category',
};
