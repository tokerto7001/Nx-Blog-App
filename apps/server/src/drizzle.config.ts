import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';
import { determineEnvPath, TNodeEnv } from './utilities/determineEnvPath';

dotenv.config({ path: determineEnvPath(process.env.NODE_ENV as TNodeEnv) });
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export default {
    schema: './src/db/schema.ts',
    out: 'drizzle',
    driver: 'pg',
    dbCredentials: {
        user: DB_USER,
        password: DB_PASSWORD,
        host: DB_HOST,
        port: +DB_PORT!,
        database: DB_NAME,
    },
} satisfies Config;
