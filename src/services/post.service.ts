import { db } from '../configs/db.config';
import { eq } from 'drizzle-orm';
import { posts, type Post, type NewPost } from '../models/post.model';

export const getPostsService = async (): Promise<Post[]> => {
  const allPosts = await db.select().from(posts);
  return allPosts;
};

export const getPostService = async (id: number): Promise<Post> => {
  const post = await db.select().from(posts).where(eq(posts.id, id));
  return post;
};
