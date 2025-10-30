import { type Request, type Response } from 'express';
import { 
  getPostsService, 
  getPostService, 
  addPostService, 
  editPostService,
  deletePostService } from '../services/post.service';

export const getPosts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const posts = await getPostsService();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const getPost = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    console.log(typeof id);
    const post = await getPostService(id);

    if (!post) return res.status(404).json({
      message: 'post does not exist'
    });

    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const addPost = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, content } = req.body;
    const post = await addPostService({ title, content });
    return res.status(201).json(post);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export const editPost = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await editPostService(id, { title, content });

    if (!post) return res.status(404).json({
      message: 'post does not exist',
    });

    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const deletePost = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const post = await deletePostService(id);

    if (!post) return res.status(404).json({
      message: 'post does not exist'
    });

    return res.status(200).json({
      message: 'post deleted successfuly',
      post
    });
  } catch (error) {
    return res.status(400).send(error);
  }
};
