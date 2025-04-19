import { useThemeColor } from "@/hooks";
import { Transaction } from "@/redux/transactions/types";
import { formatBankName, formatIndonesianDate, StatusFormatter } from "@/utils";
import { router } from "expo-router";
import React, { useMemo, useCallback, memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";

const TransactionItem: React.FC<Transaction> = memo(
  ({
    id,
    amount,
    sender_bank,
    beneficiary_bank,
    beneficiary_name,
    created_at,
    status,
  }) => {
    const whiteColor = useThemeColor("white");
    const blackColor = useThemeColor("black");

    const handlePress = useCallback(() => {
      router.push(`/${encodeURIComponent(id)}`);
    }, [id]);

    const statusColors = useMemo(
      () => ({
        background: StatusFormatter.getBackgroundColor(status),
        border: StatusFormatter.getBorderColor(status),
        text: StatusFormatter.getTextColor(status),
      }),
      [status]
    );

    const formattedAmount = useMemo(
      () => `Rp${amount.toLocaleString("id-ID")}`,
      [amount]
    );

    const formattedDate = useMemo(
      () => formatIndonesianDate(created_at),
      [created_at]
    );

    const translatedStatus = useMemo(
      () => StatusFormatter.translate(status),
      [status]
    );

    const containerStyle = useMemo<StyleProp<ViewStyle>>(
      () => [
        styles.container,
        {
          borderLeftColor: StatusFormatter.getBadgeColor(status),
          backgroundColor: whiteColor,
        },
      ],
      [status]
    );

    return (
      <Pressable onPress={handlePress} style={containerStyle}>
        <Text style={[styles.bankText, { color: blackColor }]}>
          {formatBankName(sender_bank)} ➔ {formatBankName(beneficiary_bank)}
        </Text>

        <View style={styles.row}>
          <Text style={[styles.name, { color: blackColor }]}>{beneficiary_name.toUpperCase()}</Text>
          <View
            style={[
              styles.statusBox,
              {
                backgroundColor: statusColors.background,
                borderColor: statusColors.border,
              },
            ]}
          >
            <Text style={[styles.statusText, { color: statusColors.text }]}>
              {translatedStatus}
            </Text>
          </View>
        </View>

        <View style={styles.subrow}>
          <Text style={[styles.amount, { color: blackColor }]}>{formattedAmount}</Text>
          <Text style={[styles.date, { color: blackColor }]}>{` • ${formattedDate}`}</Text>
        </View>
      </Pressable>
    );
  },
  (prev, next) => prev.id === next.id
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    borderRadius: 6,
    padding: 14,
    marginBottom: 8,
    borderLeftWidth: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subrow: {
    flexDirection: "row",
    alignItems: "center",
  },
  bankText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  name: {
    flexShrink: 1,
    marginRight: 8,
    fontWeight: "500",
    fontSize: 14,
  },
  amount: {
    fontWeight: "500",
    fontSize: 14,
  },
  date: {
    flexShrink: 0,
    fontWeight: "500",
    fontSize: 14,
  },
  statusBox: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    minWidth: 80,
    alignItems: "center",
  },
  statusText: {
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default TransactionItem;
