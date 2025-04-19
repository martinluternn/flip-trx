import { useColorScheme } from "react-native";
import { Colors } from "@/hooks/Colors";

type ColorName = keyof typeof Colors.light;

export function useThemeColor(
  colorName: ColorName,
  props?: { light?: string; dark?: string }
) {
  const theme = useColorScheme() ?? "light";
  return props?.[theme] || Colors[theme][colorName];
}
