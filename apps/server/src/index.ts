import dotenv from 'dotenv';
import { determineEnvPath, TNodeEnv } from './utilities/determineEnvPath';

dotenv.config({ path: determineEnvPath(process.env.NODE_ENV as TNodeEnv) });

import { connectToPostgres } from './clients/postgres';
connectToPostgres();

import { app } from './app';

export const httpServer = app.listen(process.env.PORT, () => {
    console.log(`Server is awake on port ${process.env.PORT}`);
});
