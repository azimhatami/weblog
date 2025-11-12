import { Router } from 'express';

import { authenticateToken } from '../middlewares/auth.middleware';
import { toggleLike, getLikesCount, getUserLikes } from '../controllers/like.controller';

const likeRouter = Router();

likeRouter.post('/:postId/toggle', authenticateToken, toggleLike);
likeRouter.get('/:postId', authenticateToken, getLikesCount);
likeRouter.get('/users/me', authenticateToken, getUserLikes);

export default likeRouter;

