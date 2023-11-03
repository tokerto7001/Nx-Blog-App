import { Router } from 'express';
import { register, verifyUser } from '../controllers/userController';
import { validateRequestBody } from '../middlewares/validateRequestBody';
import { userValidatior } from '../validators/userValidators';

const router = Router();

router
    .post('/register', validateRequestBody(userValidatior), register)
    .get('/verify/:verificationCode', verifyUser);

export { router as userRoutes };
