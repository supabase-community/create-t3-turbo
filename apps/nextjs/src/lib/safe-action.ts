import { createSafeActionClient } from "next-safe-action";

import { createClient } from "~/utils/supabase/server";

export const action = createSafeActionClient();

export const authAction = createSafeActionClient({
  async middleware() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error ?? !data.user) {
      throw new Error("Unauthorized");
    }

    return { user: data.user };
  },
});
