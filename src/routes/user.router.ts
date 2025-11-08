import { Router } from 'express';

import { register, login } from '../controllers/auth.controller';
import { limiter } from '../middlewares/ratelimit.middleware';

const userRouter = Router();

userRouter.post('/register', limiter, register);
userRouter.post('/login', limiter, login);

export default userRouter
