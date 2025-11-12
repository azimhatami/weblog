import { db } from '../configs/db.config';
import { eq, and, count } from 'drizzle-orm';
import { likes, type Like, type NewLike } from '../models/like.model';

export const createLikeService = async (userId: number, postId: number) => {
  return db.insert(likes).values({ userId, postId }).returning();
};

export const findLikeService = async (userId: number, postId: number) => {
  return db.query.likes.findFirst({
    where: and(
      eq(likes.userId, userId),
      eq(likes.postId, postId)
    )
  });
};

export const deleteLikeService = async (userId: number, postId: number) => {
  return db.delete(likes).where(
    and(
      eq(likes.userId, userId),
      eq(likes.postId, postId)
    )
  );
};

export const getLikesCountService = async (postId: number) => {
  return db.select({ count: count() })
    .from(likes)
    .where(eq(likes.postId, postId));
};

export const getUserLikesService = async (userId: number) => {
  return db.query.likes.findMany({
    where: eq(likes.userId, userId),
    with: {
      post: {
        with: { author: true }
      }
    }
  });
}
