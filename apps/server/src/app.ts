import express, { Request, Response } from 'express';

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
