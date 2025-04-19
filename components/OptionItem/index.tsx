import { useThemeColor } from "@/hooks";
import { SortOption } from "@/redux";
import React, { useCallback, memo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Spacer from "../Spacer";

type OptionItemProps = {
  item: { key: SortOption; label: string };
  selected: SortOption;
  onSelect: (option: SortOption) => void;
};

const OptionItem = memo(({ item, selected, onSelect }: OptionItemProps) => {
  const primaryColor = useThemeColor("primaryColor");
  const textPrimary = useThemeColor("textPrimary");

  const handlePress = useCallback(() => {
    onSelect(item.key);
  }, [item.key, onSelect]);

  return (
    <Pressable style={styles.option} onPress={handlePress}>
      <View style={[styles.radio, { borderColor: primaryColor }]}>
        <View
          style={[
            styles.circle,
            selected === item.key && { backgroundColor: primaryColor },
          ]}
        />
      </View>
      <Spacer size={"sm"} horizontal />
      <Text style={[styles.label, { color: textPrimary }]}>{item.label}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  label: {
    fontWeight: "500",
    fontSize: 16,
  },
});

export default OptionItem;
