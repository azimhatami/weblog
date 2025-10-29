import { Router } from 'express';
import { getPosts, getPost, addPost } from '../controllers/post.controller';

const postRouter = Router();

postRouter.get('/', getPosts);
postRouter.get('/:id', getPost);
postRouter.post('/', addPost);

export default postRouter;
