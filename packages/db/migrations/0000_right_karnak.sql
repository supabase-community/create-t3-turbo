CREATE TABLE IF NOT EXISTS "auth"."users" (
	"id" uuid PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t3turbo_profile" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"image" varchar(256),
	"email" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t3turbo_post" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"content" text NOT NULL,
	"author_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t3turbo_profile" ADD CONSTRAINT "t3turbo_profile_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t3turbo_post" ADD CONSTRAINT "t3turbo_post_author_id_t3turbo_profile_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."t3turbo_profile"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
