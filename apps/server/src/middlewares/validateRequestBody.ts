import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateRequestBody = (requestBodyDto: z.ZodRawShape) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const schema = z.object(requestBodyDto);
            schema.parse(req.body);
            return next();
        } catch (err: unknown) {
            if (err instanceof Error) {
                return res
                    .status(400)
                    .send({ status: 'fail', message: JSON.parse(err.message) });
            }
        }
    };
};
