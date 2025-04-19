import React from "react";
import { View, ViewStyle } from "react-native";

type SpacerSize = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

interface SpacerProps {
  size?: SpacerSize | number;
  horizontal?: boolean;
}

const sizeMap: Record<SpacerSize, number> = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 42,
};

const Spacer: React.FC<SpacerProps> = ({
  size = "md",
  horizontal = false,
}) => {
  const spacing = typeof size === "number" ? size : sizeMap[size];

  const style: ViewStyle = {
    [horizontal ? "width" : "height"]: spacing,
  };

  return <View style={style} />;
};

export default React.memo(Spacer);
