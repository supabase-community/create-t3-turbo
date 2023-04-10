import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export const AuthAvatar = () => {
  const user = useUser();
  const supabase = useSupabaseClient();

  const signInWithOAuth = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (user)
    return (
      <TouchableOpacity onPress={signOut}>
        <Image
          className="h-8 w-8 rounded-full"
          accessibilityLabel="User Avatar"
          source={{ uri: (user?.user_metadata.avatar_url as string) ?? null }}
        />
      </TouchableOpacity>
    );

  return (
    <TouchableOpacity onPress={signInWithOAuth}>
      <Entypo name="login" size={32} color="#E4E4E7" />
    </TouchableOpacity>
  );
};

export const HeaderBackButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.back()}>
      <Ionicons name="arrow-back" size={32} color="#E4E4E7" />
    </TouchableOpacity>
  );
};
