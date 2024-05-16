import { relations } from "drizzle-orm";
import { uuid, varchar } from "drizzle-orm/pg-core";

import { createTable } from "./_table";
import { Users } from "./auth";
import { Post } from "./post";

export const Profile = createTable("profile", {
  // Matches id from auth.users table in Supabase
  id: uuid("id")
    .primaryKey()
    .references(() => Users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 256 }).notNull(),
  image: varchar("image", { length: 256 }),
  email: varchar("email", { length: 256 }),
});

export const ProfileRelations = relations(Profile, ({ many }) => ({
  posts: many(Post),
}));
