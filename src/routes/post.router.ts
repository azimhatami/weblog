import { Router } from 'express';

import { authenticateToken, authorize } from '../middlewares/auth.middleware';
import { getPosts, getPost, createPost, updatePost, deletePost } from '../controllers/post.controller';

const postRouter = Router();

postRouter.get('/', getPosts);
postRouter.get('/:id', getPost);
postRouter.post('/', authenticateToken, createPost);
postRouter.put('/:id', authenticateToken, authorize(['admin', 'user']), updatePost);
postRouter.delete('/:id', authenticateToken, authorize(['admin', 'user']) , deletePost);

export default postRouter;
