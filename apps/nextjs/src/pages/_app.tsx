import {
  createBrowserSupabaseClient,
  type Session,
} from "@supabase/auth-helpers-nextjs";

import "../styles/globals.css";
import { useState } from "react";
import type { AppType } from "next/app";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import { api } from "~/utils/api";

const MyApp: AppType<{ initialSession: Session | null }> = ({
  Component,
  pageProps,
}) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  );
};

export default api.withTRPC(MyApp);
