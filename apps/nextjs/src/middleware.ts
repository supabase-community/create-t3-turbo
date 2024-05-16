import type { NextRequest } from "next/server";

import { updateSession } from "~/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// Clerk matcher: https://clerk.com/docs/references/nextjs/auth-middleware
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
