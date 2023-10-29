import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateRequestBody = (requestBody: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const schema = z.object(requestBody);
            schema.parse(req.body);
            return next();
        } catch (err: any) {
            return res
                .status(400)
                .send({ status: 'fail', message: JSON.parse(err.message) });
        }
    };
};
