import { useThemeColor } from "@/hooks";
import { SORT_MAP_OPTIONS, SortOption } from "@/redux";
import React, { useCallback, memo } from "react";
import { Modal, View, StyleSheet, Pressable, FlatList } from "react-native";
import OptionItem from "../OptionItem";

type SortDialogProps = {
  visible: boolean;
  onClose: () => void;
  selected: SortOption;
  onSelect: (option: SortOption) => void;
};

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
      ({ item }: { item: (typeof SORT_MAP_OPTIONS)[number] }) => (
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
              data={SORT_MAP_OPTIONS}
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
});

export default SortDialog;
