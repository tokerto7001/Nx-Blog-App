import express, { Request, Response } from 'express';
import { userRoutes } from './routes/userRoutes';
import cors from 'cors';
import morgan from 'morgan';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('combined'));

app.post('/', (req: Request, res: Response) => {
    if (!req.body.test) {
        res.status(400).send();
    } else {
        res.status(200).send('ok');
    }
});

app.use('/api/users', userRoutes);
