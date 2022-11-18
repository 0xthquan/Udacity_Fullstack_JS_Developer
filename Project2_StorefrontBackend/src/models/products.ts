import pool from '../database';

export type Product = {
    id?: number;
    name: string;
    price: number;
    category: string;
};

export class ProductsModel {
    async index(): Promise<Product[]> {
        try {
            const conn = await pool.connect();
            const sql = 'SELECT * FROM products';

            const result = await conn.query(sql);

            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Could not get products. ${err}`);
        }
    }

    async create(product: Product): Promise<Product> {
        try {
            const conn = await pool.connect();
            const sql = 'INSERT INTO products(name, price, category) VALUES($1, $2, $3) RETURNING *';

            const result = await conn.query(sql, [product.name, product.price, product.category]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not add new product. ${err}`);
        }
    }

    async getProductBy(id: number): Promise<Product> {
        try {
            const conn = await pool.connect();
            const sql = 'SELECT * FROM products WHERE id = $1';

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get product. ${err}`);
        }
    }

    async updateProduct(id: number, newProduct: Product): Promise<Product> {
        try {
            const conn = await pool.connect();
            const sql = "UPDATE products SET name = $1, price = $2, category = $3 WHERE id = $4 RETURNING *";

            const result = await conn.query(sql, [newProduct.name, newProduct.price, newProduct.category, id]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not update product. ${err}`);
        }
    }

    async deleteProduct(id: number): Promise<Product> {
        try {
            const conn = await pool.connect();
            let sql = "DELETE FROM order_products WHERE product_id = $1"
            await conn.query(sql, [id]);

            sql = "DELETE FROM products WHERE id = $1";
            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not delete product. ${err}`);
        }
    }
}
