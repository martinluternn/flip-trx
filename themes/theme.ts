import { DefaultTheme, DarkTheme, Theme } from "@react-navigation/native";
import { Colors } from "@/hooks/Colors";

export const getNavigationTheme = (isDark: boolean): Theme => ({
  ...(isDark ? DarkTheme : DefaultTheme),
  colors: {
    ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
    background: isDark ? Colors.dark.background : Colors.light.background,
    text: isDark ? Colors.dark.textPrimary : Colors.light.textPrimary,
    primary: isDark ? Colors.dark.primaryColor : Colors.light.primaryColor,
    border: isDark ? Colors.dark.border : Colors.light.border,
  },
});
