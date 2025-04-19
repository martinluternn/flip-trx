import React, { memo } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Spacer from "@/components/Spacer";

interface EmptyViewProps {
  title: string;
  subtitle: string;
}

const EmptyView = memo(({ title, subtitle }: EmptyViewProps) => (
  <View style={styles.emptyContainer}>
    <Image
      source={require("@/assets/images/empty-trx.png")}
      style={styles.emptyImage}
      resizeMode="contain"
    />
    <Spacer size="md" />
    <Text style={styles.emptyTitle}>{title}</Text>
    <Spacer size="sm" />
    <Text style={styles.emptySubtitle}>{subtitle}</Text>
  </View>
));

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  emptyImage: {
    width: "100%",
    height: 200,
  },
  emptyTitle: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default EmptyView;
