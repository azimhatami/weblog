import { db } from '../configs/db.config';
import { eq } from 'drizzle-orm';
import { posts, type Post, type NewPost } from '../models/post.model';

export const getPostsService = async (): Promise<Post[]> => {
  const allPosts = await db.select().from(posts);
  return allPosts;
};

export const getPostService = async (id: number): Promise<Post | undefined> => {
  const post = await db.select().from(posts).where(eq(posts.id, id));
  return post[0];
};

export const createPostService = async (body: NewPost): Promise<Post | undefined> => {
  const newPost = await db.insert(posts).values(body).returning();
  if (newPost) return newPost[0];
};

export const updatePostService = async (id: number, body: Post): Promise<Post | undefined> => {
  const editPost = await db.update(posts).set(body).where(eq(posts.id, id)).returning();
  if (editPost) return editPost[0];
};

export const deletePostService = async (id: number): Promise<Post | undefined> => {
  const deletedPost = await db.delete(posts).where(eq(posts.id, id)).returning({ id: posts.id });
  if (deletedPost) return deletedPost[0];
};
