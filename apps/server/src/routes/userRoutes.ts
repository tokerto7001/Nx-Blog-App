import { Router } from 'express';
import { register } from '../controllers/userController';
import { validateRequestBody } from '../middlewares/validateRequestBody';
import { userValidatior } from '../validators/userValidators';

const router = Router();

router.post('/register', validateRequestBody(userValidatior), register);

export { router as userRoutes };
