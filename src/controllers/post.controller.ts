import { type Request, type Response, type NextFunction } from 'express';
import { 
  getPostsService, 
  getPostService, 
  createPostService, 
  updatePostService,
  deletePostService } from '../services/post.service';

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
    const { title, content } = req.body;

    if (!req.user) {
      throw new Error('User not authenticated');
    }

    const authorId = req.user.userId;
    const post = await createPostService({ title, content, authorId });
    return res.status(201).json(post);
  } catch (error) {
    next(error);
  }
}

export const updatePost = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!req.user) {
      throw new Error('User not authenticated');
    }

    const authorId = req.user.userId;
    const post = await updatePostService(id, { title, content, updatedAt: new Date() });

    if (!post) return res.status(404).json({
      message: 'Post not found',
    });

    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { id } = req.params;
    if (!req.user) {
      throw new Error('User not authenticated');
    }

    const authorId = req.user.userId;
    const post = await deletePostService(id);

    if (!post) return res.status(404).json({
      message: 'Post not found'
    });

    return res.status(200).json({
      message: 'post deleted successfuly',
      post
    });
  } catch (error) {
    next(error);
  }
};
