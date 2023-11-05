import client from '../database';
import bcrypt from 'bcrypt';

type User = {
    id?: string;
    firstname: string;
    lastname: string;
    password: string;
}

