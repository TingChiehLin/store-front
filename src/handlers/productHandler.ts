import express, { Request, Response } from 'express';   
import { Product, ProductStore } from '../model/product'

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    const products = await store.index();
    res.json(products);
}

const product_routes = (app: express.Application) => {
    app.get('/products', index);
}

const show = async (req: Request, res: Response) => {  
    const product = await store.show(req.params.id);
    res.json(product);
}

const show_routes = (app: express.Application) => {
    app.get('/products/:id', show);
}

const create = async (req: Request, res: Response) => {
    const product: Product = {
        id: '',
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };

    try {
        const newProduct = await store.create(product);
        res.json(newProduct);
    } catch(err) {
        res.status(400);
        res.json(err);
    }
}

const create_routes = (app: express.Application) => {
    app.post('/products', create);
}

export {
    product_routes,
    show_routes,
    create_routes
}
