import pool from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'

dotenv.config();

const pepper: string = process.env.BCRYPT_PASSWORD as string;
const salt: string = process.env.SALT_ROUNDS as string;

export type User = {
    id?: number;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
};

export class UsersModel {
    async index(): Promise<User[]> {
        try {
            const conn = await pool.connect();
            const sql = 'SELECT * FROM Users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw Error(`Something when wrong ${error}`);
        }
    }

    async show(id: number): Promise<User> {
        try {
            const conn = await pool.connect();
            const sql = 'SELECT * FROM Users WHERE id = $1';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw Error(`Something when wrong ${error}`);
        }
    }

    async create(user: User): Promise<User> {
        const {username: userName, firstname: firstName, lastname: lastName, password} = user;
        try {
            const conn = await pool.connect();
            const sql = 'INSERT INTO users (userName, firstName, lastName, password) values ($1, $2, $3, $4) RETURNING *';
            const hashPwd = bcrypt.hashSync(password + pepper, parseInt(salt))
            const result = await conn.query(sql, [
                userName,
                firstName,
                lastName,
                hashPwd
            ]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw Error(`Something when wrong ${error}`);
        }
    }

    async deleteUser(id: number): Promise<User> {
        try {
            const conn = await pool.connect();
            const sql = "DELETE FROM users WHERE id = $1";

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not delete user. ${err}`);
        }
    }

    async authenticate(username: string, password: string): Promise<User | null> {
        try {
            const conn = await pool.connect();
            const sql = 'SELECT * FROM users WHERE username=($1)';
            const result = await conn.query(sql, [username]);
            conn.release();

            if (result.rows.length) {
                let user = result.rows[0]

                if (bcrypt.compareSync(password + pepper, user.password)) {
                    return user
                }
            }
            
            return null
        } catch (error) {
            throw Error(`Something when wrong ${error}`);
        }
    }
}
