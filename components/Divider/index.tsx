import { useThemeColor } from "@/hooks";
import React, { memo } from "react";
import { View, StyleProp, ViewStyle } from "react-native";

type DividerProps = {
  horizontal?: boolean;
  thickness?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

const Divider = memo(({
  horizontal = true,
  thickness = 1,
  color,
  style,
}: DividerProps) => {
  const backgroundColor = useThemeColor("background");

  const baseStyle: ViewStyle = {
    [horizontal ? "height" : "width"]: thickness,
    backgroundColor: color ?? backgroundColor,
    alignSelf: horizontal ? "stretch" : "center",
  };

  return <View style={[baseStyle, style]} />;
});

export default Divider;