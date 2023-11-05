import client from "../database";
import bcrypt from 'bcrypt';

export type Product = {
    id: string;
    name: string;
    price: number;
    category: string;
}

export class ProductStore {

}