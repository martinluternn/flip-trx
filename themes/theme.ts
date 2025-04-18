import { DefaultTheme, Theme } from "@react-navigation/native";
import ThemeColor from "./color";

export const themes = {
  ...DefaultTheme,
  colors: {
    background: ThemeColor.dark,
    text: ThemeColor.white,
    card: ThemeColor.dark,
    primary: ThemeColor.primaryColor,
  },
} as Theme;
