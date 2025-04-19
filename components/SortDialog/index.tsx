import { SortOption } from "@/features/transactions/types";
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
        <Pressable style={styles.backdrop} onPress={onClose}>
          <View style={styles.dialog}>
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
  const handlePress = useCallback(() => {
    onSelect(item.key);
  }, [item.key, onSelect]);

  return (
    <Pressable style={styles.option} onPress={handlePress}>
      <View style={styles.radio}>
        <View
          style={[
            styles.circle,
            selected === item.key && styles.circleSelected,
          ]}
        />
      </View>
      <Text style={styles.label}>{item.label}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#00000050",
    paddingHorizontal: 32,
  },
  dialog: {
    backgroundColor: "#fff",
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
    borderColor: "#FD6345",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  circleSelected: {
    backgroundColor: "#FD6345",
  },
  label: {
    fontWeight: "500",
    fontSize: 16,
    color: "#333",
  },
});

export default SortDialog;
