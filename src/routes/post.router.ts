import { Router } from 'express';
import { getPosts } from '../controllers/post.controller';

const postRouter = Router();

postRouter.get('/', getPosts);

export default postRouter;
