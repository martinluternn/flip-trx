import { useEffect, useCallback, useMemo } from "react";
import { View, ActivityIndicator, Text, useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Colors } from "@/hooks";

// Keep the splash screen visible while we load resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? "light";
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const handleLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    handleLayoutRootView();
  }, [handleLayoutRootView]);

  const screenOptions = useMemo<NativeStackNavigationOptions>(
    () => ({
      headerShown: false,
      contentStyle: { backgroundColor: Colors[colorScheme].background },
      animation: "fade" as const,
    }),
    []
  );

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors[colorScheme].primaryColor} />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={screenOptions}>
          <Stack.Screen
            name="index"
            options={{
              title: "Transaction List",
              animation: "default" as const,
            }}
          />
          <Stack.Screen
            name="[id]"
            options={{
              title: "Transaction Detail",
              animation: "slide_from_right" as const,
            }}
          />
        </Stack>
      </View>
    </Provider>
  );
}
