import { db } from '../configs/db.config';
import { posts, type Post, type NewPost } from '../models/post.model';

export const getPostsService = async (): Promise<Post[]> => {
  const allPosts = await db.select().from(posts);
  return allPosts;
};
