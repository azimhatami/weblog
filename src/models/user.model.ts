import { pgTable, serial, varchar, timestamp, integer } from 'drizzle-orm/pg-core';

import { roles } from './role.model';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullname: varchar('fullname', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  roleId: integer('role_id').references(() => roles.id).default(3), 
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type User = Pick<
  typeof users.$inferSelect, 
  'id' | 'fullname' | 'email' | 'createdAt'
>;

export type NewUser = typeof users.$inferInsert;
