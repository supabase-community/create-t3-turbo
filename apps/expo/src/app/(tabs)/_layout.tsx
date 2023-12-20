import { Tabs } from "expo-router"
import { LayoutDashboard, TimerIcon } from "lucide-react-native"

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarIcon: ({ focused }) => (
            <LayoutDashboard
              className={focused ? "text-blue-500" : "text-gray-500"}
            />
          )
        }}
      />
      <Tabs.Screen
        name="timeline"
        options={{
          tabBarIcon: ({ focused }) => (
            <TimerIcon
              className={focused ? "text-blue-500" : "text-gray-500"}
            />
          )
        }}
      />
    </Tabs>
  )
}
