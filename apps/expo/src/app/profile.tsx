import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

const SignedInView = () => {
  const user = useUser();

  return (
    <View>
      <Text>Signed in as {user?.email}</Text>
    </View>
  );
};

const SignedOutView = () => {
  const supabase = useSupabaseClient();

  const signInWithGithub = () =>
    supabase.auth.signInWithOAuth({ provider: "github" });

  return (
    <View className="space-y-4">
      <Text className="text-2xl font-bold text-zinc-200">
        You&apos;re signed out.
      </Text>
      <TouchableOpacity
        onPress={signInWithGithub}
        className="flex-row items-center gap-2 rounded bg-zinc-200 px-2 py-3"
      >
        <AntDesign name="github" size={24} color="black" />
        <Text className="font-semibold">Sign In With Github</Text>
      </TouchableOpacity>

      {/* Sign in with Apple */}
    </View>
  );
};

const Profile = () => {
  const user = useUser();
  return (
    <View className="flex-1 bg-zinc-800 p-4">
      {user ? <SignedInView /> : <SignedOutView />}
    </View>
  );
};

export default Profile;
