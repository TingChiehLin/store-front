"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_routes = exports.show_routes = exports.product_routes = void 0;
const product_1 = require("../model/product");
const store = new product_1.ProductStore();
const index = async (_req, res) => {
    const products = await store.index();
    res.json(products);
};
const product_routes = (app) => {
    app.get('/products', index);
};
exports.product_routes = product_routes;
const show = async (req, res) => {
    const product = await store.show(req.params.id);
    res.json(product);
};
const show_routes = (app) => {
    app.get('/products/:id', show);
};
exports.show_routes = show_routes;
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
const create_routes = (app) => {
    app.post('/products', create);
};
exports.create_routes = create_routes;
