import { pgTable, serial, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role_enum', ['admin', 'author', 'user']);

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: roleEnum('name').notNull().default('user'),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Role = typeof roles.$inferSelect;
export type NewRole = typeof roles.$inferInsert;
