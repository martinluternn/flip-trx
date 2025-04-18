import { Transaction } from "@/features/transactions/types";
import { formatBankName } from "@/utils/bankFormatter";
import { formatIndonesianDate } from "@/utils/dateFormatter";
import { StatusFormatter } from "@/utils/statusFormatter";
import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const TransactionItem: React.FC<Transaction> = ({
  id,
  amount,
  sender_bank,
  beneficiary_bank,
  beneficiary_name,
  created_at,
  status,
}) => {
  return (
    <Pressable
      onPress={() => router.push(`/${encodeURIComponent(id)}`)}
      style={[
        styles.container,
        { borderLeftColor: StatusFormatter.getBadgeColor(status) },
      ]}
    >
      <Text style={styles.bankText}>
        {formatBankName(sender_bank)} ➔ {formatBankName(beneficiary_bank)}
      </Text>
      <View style={styles.row}>
        <Text style={styles.name}>{beneficiary_name.toUpperCase()}</Text>
        <View
          style={[
            styles.statusBox,
            {
              backgroundColor: StatusFormatter.getBackgroundColor(status),
              borderColor: StatusFormatter.getBorderColor(status),
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: StatusFormatter.getTextColor(status) },
            ]}
          >
            {StatusFormatter.translate(status)}
          </Text>
        </View>
      </View>
      <View style={styles.rowSub}>
        <Text style={styles.amount}>{`Rp${amount.toLocaleString(
          "id-ID"
        )} • `}</Text>
        <Text style={styles.date}>{formatIndonesianDate(created_at)}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 6,
    padding: 14,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderLeftWidth: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowSub: {
    flexDirection: "row",
    alignItems: "center",
  },
  bankText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  name: {
    fontWeight: "500",
    fontSize: 14,
    color: "#000",
  },
  amount: {
    fontWeight: "500",
    fontSize: 14,
    color: "#000",
  },
  date: {
    fontWeight: "500",
    fontSize: 14,
    color: "#000",
  },
  statusBox: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
  },
  statusText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#fff",
  },
});

export default TransactionItem;
