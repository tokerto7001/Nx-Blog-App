import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { determineEvPath, TNodeEnv } from './utilities/determineEnvPath';

dotenv.config({ path: determineEvPath(process.env.NODE_ENV as TNodeEnv) });
const app = express();

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('ok');
});

app.listen(() => {
    console.log(`Server is awake on port ${process.env.PORT}`);
});
