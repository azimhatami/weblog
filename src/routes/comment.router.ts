import { Router } from 'express';

import { authenticateToken, authorize } from '../middlewares/auth.middleware';
import { createComment, getPostComments, updateComment, deleteComment } from '../controllers/comment.controller';

const commentRouter = Router();

commentRouter.get('/posts/:postId', getPostComments);
commentRouter.post('/', authenticateToken, createComment);
commentRouter.put('/:id', authenticateToken, authorize(['admin', 'user']), updateComment);
commentRouter.delete('/:id', authenticateToken, authorize(['admin', 'user']), deleteComment);

export default commentRouter;
