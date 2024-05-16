import { createEnv } from "@t3-oss/env-core";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { z } from "zod";

import * as schema from "./schema";

export const env = createEnv({
  server: {
    POSTGRES_URL: z.string().url(),
  },
  // eslint-disable-next-line no-restricted-properties
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});

export const db = drizzle(sql, { schema });
