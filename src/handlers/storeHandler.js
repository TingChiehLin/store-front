"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = require("../model/book");
const store = new book_1.BookStore();
const index = async (_req, res) => {
    const books = await store.index();
    res.json(books);
};
const book_routes = (app) => {
    app.get('/books', index);
};
const show = async (req, res) => {
    const article = await store.show(req.params.id);
    res.json(article);
};
exports.default = book_routes;
