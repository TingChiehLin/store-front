import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';

import {product_routes} from './handlers/productHandler';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.get('/', cors(corsOptions), (_req: Request, res: Response) => {
    res.send('this is the root route')
})

app.get('/product', cors(corsOptions), (_req: Request, res: Response) => {
    res.send('this is the product root route')
})

app.get('/product', cors(corsOptions), (_req: Request, res: Response) => {
    try {
        const products: any[] = []
        res.send('this is the res route')
        return res.json(products);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

product_routes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
