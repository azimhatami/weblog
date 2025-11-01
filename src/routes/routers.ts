import { Router } from 'express';

import postRouter from './post.router';
import userRouter from './user.router';

const router = Router();

router.use('/posts', postRouter);
router.use('/users', userRouter);

export default router;
