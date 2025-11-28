import type { Request, Response, NextFunction } from 'express';

import { 
  getPostsService, 
  getPostService, 
  createPostService, 
  updatePostService,
  deletePostService } from '../services/post.service';
import type { CreatePostDTO } from '../validation/post.validator';
import { validateCreatePost } from '../validation/post.validator';

export const getPosts = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const posts = await getPostsService();
    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { id } = req.params;
    console.log(typeof id);
    const post = await getPostService(id);

    if (!post) return res.status(404).json({
      message: 'Post not found'
    });

    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const validateResult = validateCreatePost(req.body);

    if (!validateResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validateResult.error.issues.map(issue => issue.message)
      });
    }

    if (!req.user) {
      throw new Error('User not authenticated');
    }

    const authorId = req.user.userId;

    const createPostDTO: CreatePostDTO = validateResult.data;
    const post = await createPostService({ ...createPostDTO, authorId });


    return res.status(201).json(post);
  } catch (error) {
    next(error);
  }
}

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new Error('User not authenticated');

    const { id } = req.params;
    const userId = req.user.userId;
    const userRole = req.user.role;

    const existingPost = await getPostService(id);

    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (existingPost.authorId !== userId && userRole !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }

    const validateResult = validateCreatePost(req.body);

    if (!validateResult.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validateResult.error.issues.map(issue => issue.message)
      });
    }

    const updatePostDTO = validateResult.data;

    const updatedPost = await updatePostService(id, {
      ...updatePostDTO,
      updatedAt: new Date(),
    });

    return res.status(200).json(updatedPost);

  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new Error('User not authenticated');

    const { id } = req.params;
    const userId = req.user.userId;
    const userRole = req.user.role;

    const existingPost = await getPostService(id);

    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (existingPost.authorId !== userId && userRole !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }

    const deletedPost = await deletePostService(id);

    return res.status(200).json({
      message: "Post deleted successfully",
      post: deletedPost
    });

  } catch (error) {
    next(error);
  }
};

