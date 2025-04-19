import React from "react";
import { View, ViewStyle } from "react-native";

type SpacerSize = "extraSmall" | "small" | "medium" | "large" | "extraLarge";

interface SpacerProps {
  size?: SpacerSize | number;
  horizontal?: boolean;
}

const sizeMap: Record<SpacerSize, number> = {
  extraSmall: 4,
  small: 8,
  medium: 16,
  large: 24,
  extraLarge: 32,
};

const Spacer: React.FC<SpacerProps> = ({
  size = "medium",
  horizontal = false,
}) => {
  const spacing = typeof size === "number" ? size : sizeMap[size];

  const style: ViewStyle = {
    [horizontal ? "width" : "height"]: spacing,
  };

  return <View style={style} />;
};

export default React.memo(Spacer);
