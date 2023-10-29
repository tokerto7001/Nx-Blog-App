import {
    boolean,
    pgTable,
    serial,
    text,
    timestamp,
    varchar,
} from 'drizzle-orm/pg-core';

export const Users = pgTable('users', {
    id: serial('id').primaryKey().notNull(),
    fullName: varchar('full_name', { length: 60 }).notNull(),
    email: text('email').unique().notNull(),
    password: text('password').notNull(),
    isVerified: boolean('is_verified').default(false),
    status: varchar('status', { enum: ['active', 'passive'] }).default(
        'active',
    ),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export type User = typeof Users.$inferSelect; // return type when queried
export type NewUser = typeof Users.$inferInsert; // insert type
