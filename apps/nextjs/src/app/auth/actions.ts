"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { SignInSchema, SignUpSchema } from "@acme/validators";

import { DEFAULT_LOGIN_REDIRECT } from "~/config/routes";
import { action } from "~/lib/safe-action";
import { createClient } from "~/utils/supabase/server";

export const signInWithPassword = action(
  SignInSchema,
  async ({ email, password }) => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    revalidatePath("/", "layout");
    redirect(DEFAULT_LOGIN_REDIRECT);
  },
);

export const signUp = action(SignUpSchema, async ({ email, password }) => {
  const origin = headers().get("origin");
  const supabase = createClient();

  const redirectUrl = `${origin}/auth/confirm?next=${encodeURIComponent(DEFAULT_LOGIN_REDIRECT)}`;

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectUrl,
    },
  });

  // User already exists, so fake data is returned. See https://supabase.com/docs/reference/javascript/auth-signup
  if (data.user?.identities && data.user.identities.length === 0) {
    throw new Error("An error occurred. Please try again.");
  }

  if (error) throw error;
  return data.user;
});

export const signInWithGithub = async () => {
  const origin = headers().get("origin");
  const supabase = createClient();

  const redirectUrl = `${origin}/auth/callback?next=${encodeURIComponent(DEFAULT_LOGIN_REDIRECT)}`;

  const res = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo: redirectUrl },
  });

  if (res.data.url) redirect(res.data.url);
  throw res.error;
};

export const signOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
};
