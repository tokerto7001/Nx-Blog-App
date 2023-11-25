import { ZodError, z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateRequestBody = (requestBodyDto: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            requestBodyDto.parse(req.body);
            return next();
        } catch (err: unknown) {
            if (err instanceof ZodError) {
                const issues = err.issues;
                const errorMessage = issues
                    .map((issue) => issue.message)
                    .join(', ');
                return res
                    .status(400)
                    .send({ status: 'fail', message: errorMessage });
            } else {
                return res
                    .status(500)
                    .send({ status: 'fail', message: 'Something went wrong!' });
            }
        }
    };
};
