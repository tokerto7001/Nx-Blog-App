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
    } catch (err: any) {
        return res.status(400).send({ status: 'fail', message: err.message });
    }
};
