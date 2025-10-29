import { type Request, type Response } from 'express';
import { getPostsService } from '../services/post.service';

export const getPosts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const posts = await getPostsService();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(400).send(error);
  }
};
