import { Request, Response, NextFunction } from 'express';
import { ZodError, z } from 'zod';

export const validateRequestParams = (requestQueryDto: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            requestQueryDto.parse(req.params);
            return next();
        } catch (err: unknown) {
            console.log(err);
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
