import { Router } from 'express';
import { getPosts, getPost, addPost, editPost } from '../controllers/post.controller';

const postRouter = Router();

postRouter.get('/', getPosts);
postRouter.get('/:id', getPost);
postRouter.post('/', addPost);
postRouter.put('/:id', editPost);

export default postRouter;
