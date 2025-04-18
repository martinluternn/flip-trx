import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { formatBankName } from "@/utils/bankFormatter";

export default function DetailPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { displayedData } = useSelector(
    (state: RootState) => state.transactions
  );

  const transaction = displayedData.find((tx) => tx.id === id);

  if (!transaction) {
    return (
      <View style={styles.container}>
        <Text>Transaksi tidak ditemukan</Text>
      </View>
    );
  }

  const copyToClipboard = () => {
    Clipboard.setStringAsync(transaction.id);
    Alert.alert("Disalin", "ID Transaksi telah disalin");
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#fff",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.rowHeader}>
          <Text style={styles.transactionId}>
            ID TRANSAKSI: {`#${transaction.id}`}
          </Text>
          <Pressable onPress={copyToClipboard}>
            <MaterialCommunityIcons
              name="content-copy"
              size={20}
              color="#FD6345"
              style={{transform: [{ scaleX: -1 }]}}
            />
          </Pressable>
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>DETAIL TRANSAKSI</Text>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.closeText}>Tutup</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.transferType}>
          {formatBankName(transaction.sender_bank)} ➔{" "}
          {formatBankName(transaction.beneficiary_bank)}
        </Text>

        <View style={styles.row}>
          <View style={styles.leftColumn}>
            <Text style={styles.label}>
              {transaction.beneficiary_name.toUpperCase()}
            </Text>
            <Text>7153344001</Text>
          </View>
          <View style={styles.leftAlignColumn}>
            <Text style={styles.label}>NOMINAL</Text>
            <Text>Rp1.742.940</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.leftColumn}>
            <Text style={styles.label}>BERITA TRANSFER</Text>
            <Text>sample remark</Text>
          </View>
          <View style={styles.leftAlignColumn}>
            <Text style={styles.label}>KODE UNIK</Text>
            <Text>135</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.leftColumn}>
            <Text style={styles.label}>WAKTU DIBUAT</Text>
            <Text>19 April 2025</Text>
          </View>
        </View>
        <View style={{ height: 16 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5FAF8" },
  transactionId: {
    fontWeight: "bold",
    fontSize: 14,
    marginRight: 8,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 14,
  },
  closeText: { color: "#FD6345", fontWeight: "600", fontSize: 14 },
  infoBox: {
    backgroundColor: "#fff",
    marginTop: 6,
    padding: 16,
    borderRadius: 8,
    paddingHorizontal: 24,
  },
  transferType: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  rowHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: 56,
  },
  leftColumn: {
    flex: 1,
  },
  leftAlignColumn: {
    flex: 0.5,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 42,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 24 },
  colLeft: { flex: 1.2 },
  colRight: { flex: 1, alignItems: "flex-end" },
  label: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#000",
  },
  value: {
    fontWeight: "500",
    fontSize: 14,
    color: "#000",
    marginTop: 4,
  },
});
