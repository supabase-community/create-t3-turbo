import { SafeAreaView, Text, View } from "react-native";
import { SplashScreen, Stack, useSearchParams } from "expo-router";

import { api } from "../../utils/api";

const Post: React.FC = () => {
  const { id } = useSearchParams();
  if (!id || typeof id !== "string") throw new Error("unreachable");
  const { data } = api.post.byId.useQuery({ id });

  if (!data) return <SplashScreen />;

  return (
    <SafeAreaView className="bg-zinc-900">
      <Stack.Screen
        options={{
          headerTitle: () => (
            <Text className="text-3xl font-semibold text-zinc-200">
              {data.title}
            </Text>
          ),
        }}
      />
      <View className="h-full w-full p-4">
        <Text className="py-2 text-3xl font-bold text-zinc-200">
          {data.title}
        </Text>
        <Text className="py-4 text-zinc-200">{data.content}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Post;
