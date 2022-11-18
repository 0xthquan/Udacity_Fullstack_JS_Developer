import pool from '../database';

export type OrderProduct = {
    order_id: number;
    product_id: number;
    quantity: number;
};

export type OrderProductInfo = {
    productId: number,
    name: string,
    price: number,
    category?: string,
    quantity: number
}

export class OrderProductsModel {
    async getOrderProductBy(orderId: number): Promise<OrderProductInfo[]> {
        try {
            const conn = await pool.connect();
            const sql = 'SELECT product_id, name, price, category, quantity FROM order_products JOIN products ON order_products.product_id = products.id WHERE order_id = $1';

            const result = await conn.query(sql, [orderId]);

            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get order products. ${err}`);
        }
    }

    async updateOrderProduct(productId: number, orderId: number, newQuantiy: number): Promise<OrderProduct[]> {
        try {
            const conn = await pool.connect();
            const sql = "UPDATE order_products SET quantity = $1 WHERE order_id = $2 AND product_id = $3 RETURNING *";

            const result = await conn.query(sql, [newQuantiy, orderId, productId]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not add new product. ${err}`);
        }
    }

    async addProductToOrder(orderProduct: OrderProduct): Promise<OrderProduct> {
        try {
            const conn = await pool.connect();
            const sql =
                'INSERT INTO order_products(order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';

            const result = await conn.query(sql, [orderProduct.order_id, orderProduct.product_id,  orderProduct.quantity]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not add new product. ${err}`);
        }
    }

    async deleteOrderProduct(orderId: number, productId: number): Promise<OrderProduct> {
        try {
            const conn = await pool.connect();
            const sql = "DELETE FROM order_products WHERE product_id = $1 and order_id = $2";

            const result = await conn.query(sql, [productId, orderId]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not delete product. ${err}`);
        }
    }
}
