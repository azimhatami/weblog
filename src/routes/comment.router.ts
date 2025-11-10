import { Router } from 'express';

import { authenticateToken } from '../middlewares/auth.middleware';
import { createComment, getPostComments, updateComment, deleteComment } from '../controllers/comment.controller';

const commentRouter = Router();

commentRouter.get('/posts/:postId', getPostComments);
commentRouter.post('/', authenticateToken, createComment);
commentRouter.put('/:id', authenticateToken, updateComment);
commentRouter.delete('/:id', authenticateToken, deleteComment);

export default commentRouter;
