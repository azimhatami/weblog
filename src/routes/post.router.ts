import { Router } from 'express';

import { authenticateToken } from '../middlewares/auth.middleware';
import { getPosts, getPost, createPost, updatePost, deletePost } from '../controllers/post.controller';

const postRouter = Router();

postRouter.get('/', getPosts);
postRouter.get('/:id', getPost);
postRouter.post('/', authenticateToken, createPost);
postRouter.put('/:id', authenticateToken, updatePost);
postRouter.delete('/:id', authenticateToken, deletePost);

export default postRouter;
