"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../model/product");
const store = new product_1.ProductStore();
const index = async (_req, res) => {
    const products = await store.index();
    res.json(products);
};
const product_routes = (app) => {
    app.get('/products', index);
};
const show = async (req, res) => {
    const product = await store.show(req.params.id);
    res.json(product);
};
const create = async (req, res) => {
    const product = {
        id: '',
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };
    try {
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.default = product_routes;
