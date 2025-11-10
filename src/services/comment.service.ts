import { db } from '../configs/db.config';
import { eq, desc, and } from 'drizzle-orm';
import { comments, type Comment, type NewComment } from '../models/comment.model';
import { users } from '../models/user.model.ts';

export const createCommentService = async (body: NewComment): Promise<Comment | undefined> => {
  const newComment = await db.insert(comments).values(body).returning();
  if (newComment) return newComment[0];
};

export const getPostCommentService = async (postId: number): Promise<Comment[]> => {
  const postComments = await db.select({
    id: comments.id,
    content: comments.content,
    createdAt: comments.createdAt,
    author: {
      id: users.id,
      fullname: users.fullname,
      email: users.email,
    }
  })
  .from(comments)
  .where(eq(comments.postId, postId))
  .leftJoin(users, eq(comments.userId, users.id))
  .orderBy(desc(comments.createdAt));

  return postComments;
}

export const updateCommentService = async (commentId: number, content: string, userId: number): Promise<Comment | null> => {
  const updatedComment = await db
    .update(comments)
    .set({
      content,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(comments.id, commentId),
        eq(comments.userId, userId)
      )
    )
    .returning();

  return updatedComment[0] || null;
};

export const deleteCommentService = async (commentId: number): Promise<number | undefined> => {
  const deletedComment = await db.delete(comments).where(eq(comments.id, commentId)).returning({ id: comments.id })
  if (deletedComment.length > 0) return deletedComment[0].id;
  return undefined;
};
