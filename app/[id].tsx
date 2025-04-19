import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useSelector } from "react-redux";
import React, { useCallback, useMemo } from "react";
import { formatBankName } from "@/utils";
import { selectDisplayedTransactions } from "@/redux/transactions";
import { useThemeColor } from "@/hooks";

export default function DetailPage() {
  const primaryColor = useThemeColor("primaryColor");
  const backgroundColor = useThemeColor("background");
  const textSecondary = useThemeColor("textSecondary");
  const whiteColor = useThemeColor("white");
  const blackColor = useThemeColor("black");

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
      <View style={[styles.notFoundContainer, { backgroundColor }]}>
        <Text style={[styles.notFoundText, { color: textSecondary }]}>
          Transaksi tidak ditemukan
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.headerContainer, { backgroundColor: whiteColor }]}>
        <View style={styles.rowHeader}>
          <Text style={styles.transactionId}>
            ID TRANSAKSI: #{transaction.id}
          </Text>
          <Pressable onPress={copyToClipboard}>
            <MaterialCommunityIcons
              name="content-copy"
              size={20}
              color={primaryColor}
              style={styles.mirrorIcon}
            />
          </Pressable>
        </View>

        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>DETAIL TRANSAKSI</Text>
          <Pressable onPress={router.back}>
            <Text style={[styles.closeText, { color: primaryColor }]}>
              Tutup
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={[styles.infoBox, { backgroundColor: whiteColor }]}>
        <Text style={[styles.transferType, { color: blackColor }]}>
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

        <DetailRow
          leftLabel="WAKTU DIBUAT"
          leftValue={formattedDate}
        />
      </View>
    </SafeAreaView>
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
}) => {
  const blackColor = useThemeColor("black");
  return (
    <View style={styles.detailRow}>
      <View style={styles.column}>
        <Text style={[styles.label, { color: blackColor }]}>{leftLabel}</Text>
        <Text style={[styles.value, { color: blackColor }]}>{leftValue}</Text>
      </View>
      {rightLabel && (
        <View style={styles.rightColumn}>
          <Text style={[styles.label, { color: blackColor }]}>
            {rightLabel}
          </Text>
          <Text style={[styles.value, { color: blackColor }]}>
            {rightValue}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 24,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 16,
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
    fontWeight: "600",
    fontSize: 14,
  },
  infoBox: {
    marginTop: 6,
    padding: 24,
    borderRadius: 8,
  },
  transferType: {
    fontWeight: "bold",
    fontSize: 16,
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
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
  },
  mirrorIcon: {
    transform: [{ scaleX: -1 }],
  },
});
