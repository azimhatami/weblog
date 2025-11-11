import { pgTable, serial, timestamp, integer, uniqueIndex } from 'drizzle-orm/pg-core';
import { users } from './user.model';
import { posts } from './post.model';

export const likes = pgTable('likes', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  postId: integer('post_id').references(() => posts.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => {
  return {
    userPostUnique: uniqueIndex('user_post_unique').on(table.userId, table.postId),
  };
});

export type Like = typeof likes.$inferSelect;
export type NewLike = typeof likes.$inferInsert;
