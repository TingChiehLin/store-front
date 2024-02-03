"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }
    async create(u) {
        try {
            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';
            const conn = await database_1.default.connect();
            const hash = bcrypt_1.default.hashSync(u.password, 10);
            const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not add new user ${u.firstname}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM users WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }
    async authenticate(firstname, lastname, password) {
        try {
            const sql = 'SELECT password FROM users WHERE firstname=($1) AND lastname=($2)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [firstname, lastname]);
            const user = result.rows[0];
            conn.release();
            if (bcrypt_1.default.compareSync(password, user.password)) {
                return user;
            }
            return null;
        }
        catch (err) {
            throw new Error(`Could not authenticate user ${firstname} ${lastname}. Error: ${err}`);
        }
    }
}
exports.UserStore = UserStore;
