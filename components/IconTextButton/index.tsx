import React, { memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Spacer from "@/components/Spacer";

type IconTextButtonProps = {
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  text: string;
  onPress: () => void;
  disabled?: boolean;
  iconSize?: number;
  iconColor?: string;
  disabledColor?: string;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  spacerSize?: "sm" | "md" | "lg";
};

const IconTextButton = memo(
  ({
    iconName,
    text,
    onPress,
    disabled = false,
    iconSize = 20,
    iconColor,
    disabledColor,
    textStyle,
    containerStyle,
    spacerSize,
    iconStyle,
  }: IconTextButtonProps) => {
    const color = disabled ? disabledColor : iconColor;

    return (
      <Pressable
        style={[styles.container, containerStyle]}
        onPress={onPress}
        disabled={disabled}
      >
        <View style={styles.content}>
          <Text
            style={[
              styles.text,
              textStyle,
              disabled && { color: disabledColor },
            ]}
          >
            {text}
          </Text>

          {spacerSize && <Spacer size={spacerSize} horizontal />}
          <MaterialCommunityIcons
            name={iconName}
            size={iconSize}
            style={iconStyle}
            color={color}
          />
        </View>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontWeight: "500",
  },
});

export default IconTextButton;
