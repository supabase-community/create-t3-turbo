import { Text } from "react-native"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { SessionContextProvider } from "@supabase/auth-helpers-react"

import { TRPCProvider } from "../utils/api"
import { supabase } from "../utils/supabase"

import "../styles.css"

import { SafeAreaView } from "react-native-safe-area-context"
import { cssInterop } from "nativewind"

import { AuthAvatar } from "~/components/header"

cssInterop(SafeAreaView, { className: "style" })

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <TRPCProvider>
        <Stack
          screenOptions={{
            headerRight: () => <AuthAvatar />,
            headerTitle: () => (
              <Text className="text-3xl font-bold text-zinc-200">
                <Text className="text-lime-500">dayone</Text>
              </Text>
            )
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="profile"
            options={{
              presentation: "modal"
            }}
          />
        </Stack>
        <StatusBar />
      </TRPCProvider>
    </SessionContextProvider>
  )
}
