import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export const client = new Pool({
    host: DB_HOST,
    port: +DB_PORT!,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
});

export const connectToPostgres = async () => {
    try {
        await client.connect();
        console.log(`Connected to ${DB_NAME}`);
    } catch (err) {
        console.log(err);
    }
};

export const db = drizzle(client);
