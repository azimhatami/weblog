import type { Request, Response, NextFunction } from 'express';

import { 
  createCommentService, 
  getPostCommentService, 
  updateCommentService, 
  deleteCommentService,
  getCommentByIdService 
} from '../services/comment.service';
import type { CreateCommentDTO, UpdateCommentDTO } from '../validation/comment.validator';
import { validateCreateComment, validateUpdateComment } from '../validation/comment.validator';

export const createComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const validateResult = validateCreateComment(req.body);

    if (!req.user) {
      return res.status(401).json({
        message: 'User not authenticated'
      });
    }

    if (!validateResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validateResult.error.issues.map(issue => issue.message)
      });
    }

    const userId = req.user.userId;
    const createCommentDTO: CreateCommentDTO = validateResult.data;
    const comment = await createCommentService({ ...createCommentDTO, userId });
    return res.status(201).json(comment);

  } catch (error) {
    next(error);
  }
};

export const getPostComments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { postId } = req.params;

    const postIdNum = Number(postId);
    if (isNaN(postIdNum) || postIdNum <= 0) {
      return res.status(400).json({
        message: 'Invalid post ID'
      });
    }

    const comments = await getPostCommentService(postIdNum);

    return res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
}

export const updateComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const userRole = req.user.role;

    const commentId = Number(id);
    if (isNaN(commentId) || commentId <= 0) {
      return res.status(400).json({
        message: 'Invalid comment ID'
      });
    }

    const existingComment = await getCommentByIdService(commentId);

    if (!existingComment) {
      return res.status(404).json({
        message: 'Comment not found'
      });
    }

    if (existingComment.userId  !== userId && userRole !== 'admin') {
      return res.status(403).json({
        message: 'Access denied'
      });
    }

    const validateResult = validateUpdateComment(req.body);

    if (!validateResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validateResult.error.issues.map(issue => issue.message)
      });
    }

    const updateCommentDTO: UpdateCommentDTO = validateResult.data

    const updatedComment = await updateCommentService(
      commentId,
      updateCommentDTO,
      userId
    );

    if (!updatedComment) {
      return res.status(404).json({
        message: 'Comment not found or access denied'
      });
    }

    return res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { id } = req.params;
    const userId = req.user.userId;
    const userRole = req.user.role;

    const commentId = Number(id);
    if (isNaN(commentId) || commentId <= 0) {
      return res.status(400).json({ message: "Invalid comment ID" });
    }

    const existingComment = await getCommentByIdService(commentId);

    if (!existingComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (existingComment.userId !== userId && userRole !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const deletedComment = await deleteCommentService(commentId);

    return res.status(200).json({
      message: "Comment deleted successfully",
      deletedComment
    });

  } catch (error) {
    next(error);
  }
};

