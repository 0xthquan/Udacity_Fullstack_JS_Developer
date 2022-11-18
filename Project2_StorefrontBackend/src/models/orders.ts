import pool from '../database';

export enum StatusOrder {
    COMPLETED = 'completed',
    ACTIVE = 'active'
}

export type Order = {
    id?: number;
    user_id: number;
    status: StatusOrder;
};

export class OrdersModel {
    async getOrdersByUserId(userId: number, status: StatusOrder): Promise<Order[]> {
        try {
            const conn = await pool.connect();
            const sql = 'SELECT * FROM orders WHERE user_id = $1 AND status = $2';

            const result = await conn.query(sql, [userId, status]);

            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Could not get orders. ${err}`);
        }
    }

    async create(order: Order): Promise<Order> {
        try {
            const conn = await pool.connect();
            const sql =
                'INSERT INTO orders(user_id, status) VALUES($1, $2) RETURNING *';

            const result = await conn.query(sql, [
                order.user_id,
                order.status,
            ]);

            conn.release();

            return {
                id: result.rows[0].id,
                status: result.rows[0].status,
                user_id: result.rows[0].user_id
            };
        } catch (err) {
            throw new Error(`Could not create new order. ${err}`);
        }
    }

    async updateOrderStatus(orderId: number, status: StatusOrder): Promise<Order> {
        try {
            const conn = await pool.connect();
            const sql = 'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *';

            const result = await conn.query(sql, [status, orderId]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not update order. ${err}`);
        }
    }

    async deleteOrder(id: number): Promise<Order> {
        try {
            const conn = await pool.connect();
            let sql = 'DELETE FROM order_products WHERE order_id=$1';
            await conn.query(sql, [id])

            sql = 'DELETE FROM orders WHERE id=$1';
            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not delete order. ${err}`);
        }
    }
}
