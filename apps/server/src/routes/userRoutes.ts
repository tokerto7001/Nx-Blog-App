import { Router } from 'express';
import { register, verifyUser } from '../controllers/userController';
import { validateRequestBody } from '../middlewares/validateRequestBody';
import { registerDto, userVerifyDto } from '../dtos/userDtos';
import { validateRequestParams } from '../middlewares/validateRequestParams';

const router = Router();

router
    .post('/register', validateRequestBody(registerDto), register)
    .get(
        '/verify/:verificationCode',
        validateRequestParams(userVerifyDto),
        verifyUser,
    );

export { router as userRoutes };
