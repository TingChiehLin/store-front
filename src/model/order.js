"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
    }
    async create(o) {
        try {
            const sql = 'INSERT INTO orders (orderId, quantity, status, user_id) VALUES($1, $2, $3, $4) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [o.orderId, o.quantity, o.status, o.user_id]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add new order ${o.orderId}. Error: ${err}`);
        }
    }
    async update(o) {
        try {
            const sql = 'UPDATE orders SET quantity=($1), status=($2) WHERE id=($3) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [o.quantity, o.status, o.id]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not update order ${o.orderId}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
