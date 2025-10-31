import { pgTable, serial, varchar, timestamp, text, integer, foreignKey } from 'drizzle-orm/pg-core';
import { users } from './user.model';

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  authorId: integer('author_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  authorFk: foreignKey({
    columns: [table.authorId],
    foreignColumns: [users.id],
    name: 'posts_author_id_fk'
  }).onDelete('cascade'),
}));


export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
