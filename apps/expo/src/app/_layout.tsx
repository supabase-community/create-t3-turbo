import { SafeAreaProvider } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";

import "react-native-url-polyfill/auto";
import { HeaderBackButton } from "../components/header";
import { TRPCProvider } from "../utils/api";

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};

const supabase = createClient(
  // App Throws if these are not defined, so we can safely cast
  Constants.expoConfig?.extra?.SUPABASE_URL as string,
  Constants.expoConfig?.extra?.SUPABASE_ANON_KEY as string,
  {
    auth: {
      storage: ExpoSecureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      // @ts-expect-error - FIXME: Do I need a canary???
      flowType: "pkce",
    },
  },
);

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <TRPCProvider>
        <SafeAreaProvider>
          {/*
            The Stack component displays the current page.
            It also allows you to configure your screens 
          */}
          <Stack
            screenOptions={{
              headerLeft: () => <HeaderBackButton />,
              headerStyle: {
                backgroundColor: "#18181A",
              },
            }}
          >
            <Stack.Screen
              name="profile"
              options={{
                presentation: "modal",
                headerTitle: () => <></>,
              }}
            />
          </Stack>
          <StatusBar />
        </SafeAreaProvider>
      </TRPCProvider>
    </SessionContextProvider>
  );
};

export default RootLayout;
