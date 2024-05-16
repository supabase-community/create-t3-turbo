import Link from "next/link";

import { Button } from "@acme/ui/button";

import { SignOutButton } from "~/app/auth/_components/sign-out-button";
import { DEFAULT_AUTH_ROUTE } from "~/config/routes";
import { createClient } from "~/utils/supabase/server";

export async function AuthShowcase() {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (user.error ?? !user.data.user) {
    return (
      <Button asChild size="lg">
        <Link href={DEFAULT_AUTH_ROUTE}>Sign in</Link>
      </Button>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        <span>Logged in as {user.data.user.email}</span>
      </p>

      <SignOutButton />
    </div>
  );
}
