import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { determineEvPath, TNodeEnv } from './utilities/determineEnvPath';

dotenv.config({ path: determineEvPath(process.env.NODE_ENV as TNodeEnv) });
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', (req: Request, res: Response) => {
    if (!req.body.test) {
        res.status(400).send();
    } else {
        res.status(200).send('ok');
    }
});

export const httpServer = app.listen(process.env.PORT, () => {
    console.log(`Server is awake on port ${process.env.PORT}`);
});
