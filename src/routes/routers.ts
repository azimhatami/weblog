import { Router } from 'express';

import postRouter from './post.router';
import userRouter from './user.router';
import commentRouter from './comment.router';

const router = Router();

router.use('/posts', postRouter);
router.use('/users', userRouter);
router.use('/comments', commentRouter);

export default router;
