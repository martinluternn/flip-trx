import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useSelector } from "react-redux";
import { formatBankName } from "@/utils/bankFormatter";
import React, { useCallback, useMemo } from "react";
import { selectDisplayedTransactions } from "@/features/transactions/transactionsSlice";

export default function DetailPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const transaction = useSelector(selectDisplayedTransactions).find(
    (tx) => tx.id === id?.toString()
  );

  const copyToClipboard = useCallback(() => {
    if (!transaction) return;
    Clipboard.setStringAsync(transaction.id);
    Alert.alert("Disalin", "ID Transaksi telah disalin");
  }, [transaction]);

  const formattedDate = useMemo(() => {
    if (!transaction?.created_at) return "";
    return new Date(transaction.created_at).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [transaction?.created_at]);

  if (!transaction) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Transaksi tidak ditemukan</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.rowHeader}>
          <Text style={styles.transactionId}>
            ID TRANSAKSI: #{transaction.id}
          </Text>
          <Pressable onPress={copyToClipboard}>
            <MaterialCommunityIcons
              name="content-copy"
              size={20}
              color="#FD6345"
              style={styles.mirrorIcon}
            />
          </Pressable>
        </View>

        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>DETAIL TRANSAKSI</Text>
          <Pressable onPress={router.back}>
            <Text style={styles.closeText}>Tutup</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.transferType}>
          {formatBankName(transaction.sender_bank)} ➔{" "}
          {formatBankName(transaction.beneficiary_bank)}
        </Text>

        <DetailRow
          leftLabel={transaction.beneficiary_name.toUpperCase()}
          leftValue={transaction.account_number}
          rightLabel="NOMINAL"
          rightValue={`Rp${transaction.amount?.toLocaleString("id-ID")}`}
        />

        <DetailRow
          leftLabel="BERITA TRANSFER"
          leftValue={transaction.remark}
          rightLabel="KODE UNIK"
          rightValue={transaction.unique_code}
        />

        <DetailRow leftLabel="WAKTU DIBUAT" leftValue={formattedDate} />
      </View>
    </View>
  );
}

const DetailRow = ({
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
}: {
  leftLabel: string;
  leftValue?: string | number;
  rightLabel?: string;
  rightValue?: string | number;
}) => (
  <View style={styles.detailRow}>
    <View style={styles.column}>
      <Text style={styles.label}>{leftLabel}</Text>
      <Text style={styles.value}>{leftValue}</Text>
    </View>
    {rightLabel && (
      <View style={styles.rightColumn}>
        <Text style={styles.label}>{rightLabel}</Text>
        <Text style={styles.value}>{rightValue}</Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FAF8",
  },
  headerContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FAF8",
  },
  notFoundText: {
    fontSize: 16,
    color: "#666",
  },
  transactionId: {
    fontWeight: "bold",
    fontSize: 14,
    marginRight: 8,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 14,
  },
  closeText: {
    color: "#FD6345",
    fontWeight: "600",
    fontSize: 14,
  },
  infoBox: {
    backgroundColor: "#fff",
    marginTop: 6,
    padding: 24,
    borderRadius: 8,
  },
  transferType: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  rowHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 56,
    marginBottom: 42,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
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
    color: "#000",
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: "#333",
  },
  mirrorIcon: {
    transform: [{ scaleX: -1 }],
  },
});
