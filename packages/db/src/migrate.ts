import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";

import { env } from "./client";

const runMigrate = async () => {
  if (!env.POSTGRES_URL) {
    throw new Error("POSTGRES_URL is not defined");
  }

  const db = drizzle(sql);

  console.log("⏳ Running migrations...");

  const start = Date.now();

  await migrate(db, { migrationsFolder: "migrations" });

  const end = Date.now();

  console.log("✅ Migrations completed in", end - start, "ms");

  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
