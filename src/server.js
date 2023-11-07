"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const productHandler_1 = __importDefault(require("./handlers/productHandler"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.get('/', (0, cors_1.default)(corsOptions), (_req, res) => {
    res.send('this is the root route');
});
app.get('/product', (0, cors_1.default)(corsOptions), (_req, res) => {
    res.send('this is the product root route');
});
app.get('/product', (0, cors_1.default)(corsOptions), (_req, res) => {
    try {
        const products = [];
        res.send('this is the res route');
        return res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
(0, productHandler_1.default)(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
