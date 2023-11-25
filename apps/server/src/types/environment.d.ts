declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test';
            PORT: number;
            DB_HOST: string;
            DB_PORT: number;
            DB_USER: string;
            DB_PASSWORD: string;
            DB_NAME: string;
            HASH_SALT_ROUNDS: number;
            SENDGRID_API_KEY: string;
            SENDGRID_MAIL: string;
            JWT_AUTH_SECRET_KEY: string;
            JWT_AUTH_EXPIRES_IN: string;
            API_URL: string;
        }
    }
}

export {};
