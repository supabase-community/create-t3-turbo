import { Text, TouchableOpacity, View } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { AntDesign } from "@expo/vector-icons";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import { initiateAppleSignIn } from "../utils/auth";

export default function Profile() {
  const user = useUser();
  return (
    <View className="flex-1 bg-zinc-800 p-4">
      {user ? <SignedInView /> : <SignedOutView />}
    </View>
  );
}

function SignedInView() {
  const supabase = useSupabaseClient();
  const user = useUser();

  return (
    <View className="flex gap-4">
      <Text className="text-zinc-200">Signed in as {user?.email}</Text>
      <TouchableOpacity
        onPress={() => supabase.auth.signOut()}
        className="flex-row items-center justify-center gap-2 rounded-lg bg-zinc-200 p-2"
      >
        <Text className="text-xl font-semibold text-zinc-900">Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

function SignedOutView() {
  const supabase = useSupabaseClient();

  const signInWithGithub = async () => {
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) return console.error(error.message);

    const redirect = makeRedirectUri({
      path: "/auth/callback",
    });
    console.log({ redirect });

    const res = await WebBrowser.openAuthSessionAsync(
      data.url + "&redirect_uri=" + redirect,
      redirect,
    );
    console.log({ res });

    if (res.type !== "success") throw new Error();
    const params = new URL(res.url).searchParams;
    const state = params.get("state");
    const code = params.get("code");

    console.log({ state, code });
  };

  const signInWithApple = async () => {
    try {
      const { token, nonce } = await initiateAppleSignIn();
      const { error } = await supabase.auth.signInWithIdToken({
        provider: "apple",
        token,
        nonce,
      });
      if (error) throw error;
    } catch (e) {
      console.log("Error", e);
      if (typeof e === "object" && !!e && "code" in e) {
        if (e.code === "ERR_REQUEST_CANCELED") {
          // handle that the user canceled the sign-in flow
        } else {
          // handle other errors
        }
      } else {
        console.error("Unexpected error from Apple SignIn: ", e);
      }
    }
  };

  return (
    <View className="space-y-4">
      <Text className="text-2xl font-bold text-zinc-200">
        You&apos;re signed out.
      </Text>
      <TouchableOpacity
        onPress={signInWithGithub}
        className="h-14 flex-row items-center justify-center gap-2 rounded-lg bg-zinc-200 p-2"
      >
        <AntDesign name="github" size={18} color="black" />
        <Text className="text-xl font-medium">Sign In With Github</Text>
      </TouchableOpacity>

      {/* Sign in with Apple */}
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        className="h-14"
        cornerRadius={8}
        onPress={signInWithApple}
      />
    </View>
  );
}
