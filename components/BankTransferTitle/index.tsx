import { useThemeColor } from "@/hooks";
import { formatBankName } from "@/utils";
import React, { memo } from "react";
import { Text, StyleSheet } from "react-native";

const BankTransferTitle = memo(
  ({
    senderBank,
    beneficiaryBank,
  }: {
    senderBank: string;
    beneficiaryBank: string;
  }) => {
    const blackColor = useThemeColor("black");

    return (
      <Text style={[styles.bankText, { color: blackColor }]}>
        {formatBankName(senderBank)} ➔ {formatBankName(beneficiaryBank)}
      </Text>
    );
  }
);

const styles = StyleSheet.create({
  bankText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default BankTransferTitle;