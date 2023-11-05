import express, {Request, Response} from 'express'; 
import { Book, BookStore } from '../model/book';

const store = new BookStore();  

const index = async (_req: Request, res: Response) => { 
    const books = await store.index(); 
    res.json(books); 
}

const book_routes = (app: express.Application) => {
    app.get('/books', index); 
}

const show = async (req: Request, res: Response) => {
    const article = await store.show(req.params.id)
    res.json(article)
 }
 

export default book_routes; 