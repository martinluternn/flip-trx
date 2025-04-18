import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "Transaction List" }}
        />
        <Stack.Screen
          name="[id]"
          options={{ headerShown: false, title: "Transaction Detail" }}
        />
      </Stack>
    </Provider>
  );
}
