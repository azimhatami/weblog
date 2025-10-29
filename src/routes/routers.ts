import postRouter from './post.router';
import { Router } from 'express';

const router = Router();

router.use('/posts', postRouter);

export default router;
