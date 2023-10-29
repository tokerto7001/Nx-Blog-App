import { RequestHandler } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export const register: RequestHandler = async (req, res) => {
    try {
        const data = userService.register();
        return res
            .status(200)
            .send({
                status: 'success',
                data,
                message: 'User registration is completed successfully.',
            });
    } catch (err) {
        console.log(err);
    }
};
