import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const { 
    POSTGRES_HOST, 
    POSTGRES_DB, 
    POSTGRES_DB_TEST,
    POSTGRES_USER, 
    POSTGRES_PASSWORD,
    ENV 
} = process.env;

console.log(ENV)
let pool: Pool = new Pool()
if (ENV === 'test') {
    pool = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}

if (ENV === 'dev') {
    pool = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}

export default pool;
