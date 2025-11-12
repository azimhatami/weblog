import { Router } from 'express';

import postRouter from './post.router';
import userRouter from './user.router';
import commentRouter from './comment.router';
import likeRouter from './like.router';

const router = Router();

router.use('/posts', postRouter);
router.use('/users', userRouter);
router.use('/comments', commentRouter);
router.use('/likes', likeRouter);

export default router;
