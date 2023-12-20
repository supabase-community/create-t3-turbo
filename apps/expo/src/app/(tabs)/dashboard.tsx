import React from "react"
import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack } from "expo-router"

export default function DashboardScreen() {
  return (
    <SafeAreaView>
      <Stack.Screen />
      <Text>DashboardScreen</Text>
    </SafeAreaView>
  )
}
