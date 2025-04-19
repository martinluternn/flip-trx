import { useThemeColor } from "@/hooks";
import { SortOption } from "@/redux/transactions/types";
import React, { useCallback, memo } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";

type SortDialogProps = {
  visible: boolean;
  onClose: () => void;
  selected: SortOption;
  onSelect: (option: SortOption) => void;
};

const OPTIONS = [
  { key: "default", label: "URUTKAN" },
  { key: "name-asc", label: "Nama A-Z" },
  { key: "name-desc", label: "Nama Z-A" },
  { key: "date-desc", label: "Tanggal Terbaru" },
  { key: "date-asc", label: "Tanggal Terlama" },
] as const;

const SortDialog = memo(
  ({ visible, onClose, selected, onSelect }: SortDialogProps) => {
    const backdropColor = useThemeColor("backdrop");
    const whiteColor = useThemeColor("white");

    const handleOptionSelect = useCallback(
      (option: SortOption) => {
        onSelect(option);
        onClose();
      },
      [onSelect, onClose]
    );

    const renderItem = useCallback(
      ({ item }: { item: (typeof OPTIONS)[number] }) => (
        <OptionItem
          item={item}
          selected={selected}
          onSelect={handleOptionSelect}
        />
      ),
      [selected, handleOptionSelect]
    );

    return (
      <Modal visible={visible} animationType="fade" transparent>
        <Pressable
          style={[styles.backdrop, { backgroundColor: backdropColor }]}
          onPress={onClose}
        >
          <View style={[styles.dialog, { backgroundColor: whiteColor }]}>
            <FlatList
              data={OPTIONS}
              keyExtractor={(item) => item.key}
              renderItem={renderItem}
              initialNumToRender={5}
              maxToRenderPerBatch={5}
            />
          </View>
        </Pressable>
      </Modal>
    );
  }
);

type OptionItemProps = {
  item: (typeof OPTIONS)[number];
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
      <Text style={[styles.label, { color: textPrimary }]}>{item.label}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  dialog: {
    borderRadius: 10,
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
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
    marginRight: 10,
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

export default SortDialog;
