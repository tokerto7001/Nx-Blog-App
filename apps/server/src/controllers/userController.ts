import { RequestHandler } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export const register: RequestHandler = async (req, res) => {
    try {
        const data = await userService.register(req.body);
        return res.status(201).send({
            status: 'success',
            data,
            message: 'User registration is completed successfully.',
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res
                .status(400)
                .send({ status: 'fail', message: err.message });
        }
    }
};

export const verifyUser: RequestHandler = async (req, res) => {
    try {
        const data = await userService.verifyUser(req.params.verificationCode);
        // navigate user to the login page if there is
        return res.status(200).send({
            status: 'success',
            data,
            message: 'User verification is done successfully.',
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res
                .status(400)
                .send({ status: 'fail', message: err.message });
        }
    }
};
