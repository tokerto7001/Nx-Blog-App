import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import { TNodeEnv, determineEnvPath } from '../utilities/determineEnvPath';

dotenv.config({ path: determineEnvPath(process.env.NODE_ENV as TNodeEnv) });
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const client = new Pool({
    host: DB_HOST,
    port: +DB_PORT!,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    max: 1,
});

const db = drizzle(client);

migrate(db, { migrationsFolder: './drizzle' })
    .then(() => {
        console.log('Migration is done properly');
        process.exit(0);
    })
    .catch((err) => {
        console.log('Migration error:', err);
        process.exit(1);
    });
