import { Router } from 'express';
import { signUp, signIn, signOut } from '../controllers/authController.js';
import { checkExistingUser } from '../middlewares/checkExistingUserMiddleware.js';
import { validateSignUp, validateSignIn } from '../middlewares/validateAuthMiddleware.js';
import { validateToken } from '../middlewares/validateTokenMiddleware.js';

const authRouter = Router();

authRouter.post('/sign-in', validateSignIn, signIn);
authRouter.post('/sign-up', validateSignUp, checkExistingUser, signUp);
authRouter.delete('/sign-out', validateToken, signOut);

export default authRouter;
