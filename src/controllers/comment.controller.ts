import { type Request, type Response, type NextFunction } from 'express';
import { createCommentService, getPostCommentService, updateCommentService, deleteCommentService } from '../services/comment.service';

export const createComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { content, postId } = req.body;

    if (!req.user) {
      return res.status(401).json({
        message: 'User not authenticated'
      });
    }

    const userId = req.user.userId;

    const comment = await createCommentService({ content, postId, userId });
    return res.status(201).json(comment);

  } catch (error) {
    next(error);
  }
};

export const getPostComments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { postId } = req.params;

    const comments = await getPostCommentService(Number(postId));

    return res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
}

export const updateComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.userId;

    const updatedComment = await updateCommentService(
      Number(id),
      content,
      userId
    );

    if (!updatedComment) {
      return res.status(404).json({
        message: 'Comment not found or access denied'
      });
    }

    return res.status(200).json({ updatedComment });
  } catch (error) {
    next(error);
  }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (!req.user) {
      throw new Error('User not authenticated');
    }

    const commentId = await deleteCommentService(Number(id));

    if (!commentId) {
      return res.status(404).json({
        message: 'Comment not found'
      });
    }

    return res.status(200).json({
      message: 'Comment deleted successfuly',
      commentId
    });
  } catch (error) {
    next(error);
  }
};
