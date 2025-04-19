import { useThemeColor } from "@/hooks";
import { Transaction } from "@/redux";
import { formatCurrency, formatIndonesianDate, StatusFormatter } from "@/utils";
import { router } from "expo-router";
import React, { useMemo, useCallback, memo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Spacer from "../Spacer";
import BankTransferTitle from "../BankTransferTitle";

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

    const formattedAmount = useMemo(() => formatCurrency(amount), [amount]);

    const formattedDate = useMemo(
      () => formatIndonesianDate(created_at),
      [created_at]
    );

    const translatedStatus = useMemo(
      () => StatusFormatter.translate(status),
      [status]
    );

    const dynamicStyles = useMemo(
      () =>
        StyleSheet.create({
          container: {
            borderLeftColor: StatusFormatter.getBadgeColor(status),
            backgroundColor: whiteColor,
          },
          text: {
            color: blackColor,
          },
          statusBox: {
            backgroundColor: statusColors.background,
            borderColor: statusColors.border,
          },
          statusText: {
            color: statusColors.text,
          },
        }),
      [status, whiteColor, blackColor, statusColors]
    );

    return (
      <>
        <Pressable
          onPress={handlePress}
          style={[styles.container, dynamicStyles.container]}
        >
          <BankTransferTitle
            beneficiaryBank={beneficiary_bank}
            senderBank={sender_bank}
          />
          <View style={styles.row}>
            <Text style={[styles.name, dynamicStyles.text]}>
              {beneficiary_name.toUpperCase()}
            </Text>
            <Spacer size={"sm"} horizontal />
            <View style={[styles.statusBox, dynamicStyles.statusBox]}>
              <Text style={[styles.statusText, dynamicStyles.statusText]}>
                {translatedStatus}
              </Text>
            </View>
          </View>

          <View style={styles.subrow}>
            <Text style={[styles.amount, dynamicStyles.text]}>
              {formattedAmount}
            </Text>
            <Text
              style={[styles.date, dynamicStyles.text]}
            >{` • ${formattedDate}`}</Text>
          </View>
        </Pressable>
        <Spacer size={"sm"} />
      </>
    );
  },
  (prev, next) => prev.id === next.id
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    borderRadius: 6,
    padding: 14,
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
  name: {
    flexShrink: 1,
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
