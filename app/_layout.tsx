import { Stack } from "expo-router";
import { AuthProvider } from "./auth-context";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)/Login" />
        <Stack.Screen name="(auth)/SignUp" />
        <Stack.Screen name="main/home" />
      </Stack>
    </AuthProvider>
  );
}
