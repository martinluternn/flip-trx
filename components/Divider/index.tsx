import React, { memo } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import ThemeColor from "@/themes/color";

type DividerProps = {
  horizontal?: boolean;
  thickness?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

const Divider = memo(({
  horizontal = true,
  thickness = 1,
  color = ThemeColor.divider,
  style,
}: DividerProps) => {
  const baseStyle: ViewStyle = {
    [horizontal ? "height" : "width"]: thickness,
    backgroundColor: color,
    alignSelf: horizontal ? "stretch" : "center",
  };

  return <View style={[baseStyle, style]} />;
});

export default Divider;