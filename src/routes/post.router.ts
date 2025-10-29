import { Router } from 'express';
import { getPosts, getPost } from '../controllers/post.controller';

const postRouter = Router();

postRouter.get('/', getPosts);
postRouter.get('/:id', getPost);

export default postRouter;
