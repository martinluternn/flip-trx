import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import Spacer from "../Spacer";

interface BankTransferDetailProps {
  leftLabel: string;
  leftValue?: string | number;
  rightLabel?: string;
  rightValue?: string | number;
  textColor: string;
}

const BankTransferDetail: React.FC<BankTransferDetailProps> = ({
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
  textColor,
}) => {
  const styles = useMemo(() => createStyles(textColor), [textColor]);

  return (
    <>
      <Spacer size={"lg"} />
      <View style={styles.detailRow}>
        <View style={styles.column}>
          <Text style={styles.label}>{leftLabel}</Text>
          <Spacer size={"xs"} />
          <Text style={styles.value}>{leftValue}</Text>
        </View>
        {rightLabel && (
          <View style={styles.rightColumn}>
            <Text style={styles.label}>{rightLabel}</Text>
            <Spacer size={"xs"} />
            <Text style={styles.value}>{rightValue}</Text>
          </View>
        )}
      </View>
    </>
  );
};

const createStyles = (textColor: string) =>
  StyleSheet.create({
    detailRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    column: {
      flex: 1,
    },
    rightColumn: {
      flex: 0.5,
    },
    label: {
      fontWeight: "bold",
      fontSize: 14,
      color: textColor,
    },
    value: {
      fontSize: 14,
      color: textColor,
    },
  });

export default BankTransferDetail;
