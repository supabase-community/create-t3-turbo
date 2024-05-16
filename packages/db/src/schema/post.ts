import { relations, sql } from "drizzle-orm";
import { text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { timestamps } from "../lib/utils";
import { createTable } from "./_table";
import { Profile } from "./profile";

export const Post = createTable("post", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("name", { length: 256 }).notNull(),
  content: text("content").notNull(),
  authorId: uuid("author_id")
    .notNull()
    .references(() => Profile.id),
  createdAt: timestamp("created_at")
    .default(sql`now()`)
    .notNull(),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
  }).$onUpdateFn(() => sql`now()`),
});

export const PostRelations = relations(Post, ({ one }) => ({
  author: one(Profile, { fields: [Post.authorId], references: [Profile.id] }),
}));

export const CreatePostSchema = createInsertSchema(Post, {
  title: z.string().max(256),
  content: z.string().max(256),
}).omit({
  id: true,
  authorId: true,
  ...timestamps,
});
