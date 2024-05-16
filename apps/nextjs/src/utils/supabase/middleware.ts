import type { CookieOptions } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

import {
  authRoutes,
  DEFAULT_AUTH_ROUTE,
  DEFAULT_LOGIN_REDIRECT,
  protectedRoutes,
} from "~/config/routes";
import { env } from "~/env";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    },
  );

  // Get user
  const { data, error } = await supabase.auth.getUser();

  // If protected route and user is not authenticated, redirect to login
  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);

  if (isProtectedRoute && (error ?? !data.user)) {
    const url = new URL(DEFAULT_AUTH_ROUTE, request.url);
    return NextResponse.redirect(url);
  }

  // Forward authed user to DEFAULT_LOGIN_REDIRECT if auth route
  const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);

  if (isAuthRoute && data.user) {
    const url = new URL(DEFAULT_LOGIN_REDIRECT, request.url);
    return NextResponse.redirect(url);
  }

  // Proceed as normal
  return response;
}
