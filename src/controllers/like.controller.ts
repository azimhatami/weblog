import { type Request, type Response, type NextFunction } from 'express';
import { 
  createLikeService, 
  findLikeService, 
  deleteLikeService, 
  getLikesCountService, 
  getUserLikesService 
} from '../services/like.service';

export const toggleLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.userId;
    const postId = req.params.postId

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (isNaN(postId)) {
      return res.status(400).json({ error: 'Valid post ID is required' });
    }

    const existLike = await findLikeService(userId, postId);

    if (existLike) {
      await deleteLikeService(userId, postId);
    } else {
      await createLikeService(userId, postId);
    }

    const likeCount = await getLikesCountService(postId);

    return res.status(200).json({
      action: existLike ? 'unliked' : 'liked',
      likeCount: likeCount[0]?.count || 0,
      postId
    });
  } catch (error) {
    next(error);
  }
};

export const getLikesCount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    const postId = req.params.postId;

    if (!postId) {
      return res.status(400).json({ error: 'Post ID is required' });
    }

    const likeCountResult = await getLikesCountService(postId);
    const likeCount = likeCountResult[0]?.count || 0;

    let isLiked = false;
    if (userId) {
      const userLike = await findLikeService(userId, postId);
      isLiked = !!userLike;
    }

    return res.status(200).json({
      postId,
      likeCount,
      isLiked
    });
  } catch (error) {
    next(error);
  }
};

export const getUserLikes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.userId;

    if (!userId) {
      return res.status(401).json({
        error: 'user not authenticated'
      });
    }

    const likedPosts = await getUserLikesService(userId);

    return res.status(200).json({
      likedPosts,
    });
  } catch (error) {
    next(error);
  }
};
