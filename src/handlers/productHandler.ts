import express, { Request, Response } from 'express';   
import { Product, ProductStore } from '../model/product'
import verifyAuthToken from '../middleware/verifyAuthToken';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    const products = await store.index();
    res.json(products);
}

const show = async (req: Request, res: Response) => {  
    const product = await store.show(req.params.id);
    res.json(product);
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



const product_routes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);
}

export default product_routes;

// app.get('/product', cors(corsOptions), (_req: Request, res: Response) => {
//     res.send('this is the product root route')
// })

// app.get('/product', cors(corsOptions), (_req: Request, res: Response) => {
//     try {
//         const products: any[] = []
//         res.send('this is the res route')
//         return res.json(products);
//     } catch (err) {
//         res.status(400)
//         res.json(err)
//     }
// })