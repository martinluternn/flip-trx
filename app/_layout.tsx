import { useEffect, useCallback, useMemo } from "react";
import {
  View,
  ActivityIndicator,
  useColorScheme,
  StyleSheet,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Colors } from "@/hooks";
import { STRINGS } from "@/constants";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? "light";
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Memoized styles based on color scheme
  const styles = useMemo(() => getStyles(colorScheme), [colorScheme]);

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
      animation: "fade",
    }),
    []
  );

  if (!fontsLoaded && !fontError) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={styles.loader.color} />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Stack screenOptions={screenOptions}>
          <Stack.Screen
            name="index"
            options={{
              title: STRINGS.TRANSACTION_LIST.TITLE,
              animation: "default",
            }}
          />
          <Stack.Screen
            name="[id]"
            options={{
              title: STRINGS.TRANSACTION_DETAIL.TITLE,
              animation: "slide_from_right",
            }}
          />
        </Stack>
      </View>
    </Provider>
  );
}

const getStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors[colorScheme].background,
    },
    loader: {
      color: Colors[colorScheme].primaryColor,
    },
  });
