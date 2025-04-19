import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Clipboard from "expo-clipboard";
import { useSelector } from "react-redux";
import React, { useCallback, useMemo } from "react";
import { selectDisplayedTransactions } from "@/redux";
import { useThemeColor } from "@/hooks";
import {
  BankTransferDetail,
  BankTransferTitle,
  Divider,
  EmptyView,
  IconTextButton,
  Spacer,
} from "@/components";
import { formatCurrency } from "@/utils";
import { STRINGS } from "@/constants";

export default function DetailPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const transaction = useSelector(selectDisplayedTransactions).find(
    (tx) => tx.id === id?.toString()
  );

  // Theme colors
  const primaryColor = useThemeColor("primaryColor");
  const backgroundColor = useThemeColor("background");
  const textSecondary = useThemeColor("textSecondary");
  const whiteColor = useThemeColor("white");
  const blackColor = useThemeColor("black");

  // Memoized styles with theme colors
  const styles = useMemo(
    () => createStyles(primaryColor, whiteColor, blackColor),
    [primaryColor, backgroundColor, textSecondary, whiteColor, blackColor]
  );

  const copyToClipboard = useCallback(() => {
    if (!transaction) return;
    Clipboard.setStringAsync(transaction.id);
    Alert.alert(
      STRINGS.COMMON.COPY_SUCCESS,
      STRINGS.TRANSACTION_DETAIL.COPY_CONFIRMATION
    );
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
      <EmptyView
        title={STRINGS.ERROR_MESSAGES.TRANSACTION_NOT_FOUND}
        subtitle={STRINGS.COMMON.TRY_AGAIN}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Spacer size={"lg"} />
        <Spacer size={"xs"} />
        <View style={styles.rowHeader}>
          <IconTextButton
            iconName="content-copy"
            text={`${STRINGS.TRANSACTION_DETAIL.ID_PREFIX}${transaction.id}`}
            onPress={copyToClipboard}
            iconColor={primaryColor}
            textStyle={styles.transactionId}
            containerStyle={styles.rowHeader}
            spacerSize="sm"
            iconStyle={styles.mirrorIcon}
          />
        </View>
        <Spacer size={"lg"} />
        <Divider thickness={1} />
        <Spacer size={"lg"} />
        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>
            {STRINGS.TRANSACTION_DETAIL.TITLE}
          </Text>
          <Pressable onPress={router.back}>
            <Text style={styles.closeText}>{STRINGS.COMMON.CLOSE}</Text>
          </Pressable>
        </View>
        <Spacer size={"lg"} />
      </View>
      <Spacer size={"xxs"} />
      <View style={styles.infoBox}>
        <BankTransferTitle
          beneficiaryBank={transaction.beneficiary_bank}
          senderBank={transaction.sender_bank}
        />
        <BankTransferDetail
          leftLabel={transaction.beneficiary_name.toUpperCase()}
          leftValue={transaction.account_number}
          rightLabel={STRINGS.TRANSACTION_DETAIL.AMOUNT}
          rightValue={formatCurrency(transaction.amount)}
          textColor={blackColor}
        />
        <BankTransferDetail
          leftLabel={STRINGS.TRANSACTION_DETAIL.TRANSFER_TITLE}
          leftValue={transaction.remark}
          rightLabel={STRINGS.TRANSACTION_DETAIL.UNIQUE_CODE}
          rightValue={transaction.unique_code}
          textColor={blackColor}
        />
        <BankTransferDetail
          leftLabel={STRINGS.TRANSACTION_DETAIL.CREATED_TIME}
          leftValue={formattedDate}
          textColor={blackColor}
        />
      </View>
    </SafeAreaView>
  );
}

const createStyles = (
  primaryColor: string,
  whiteColor: string,
  blackColor: string
) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    headerContainer: {
      paddingHorizontal: 24,
      backgroundColor: whiteColor,
    },
    transactionId: {
      fontWeight: "bold",
      fontSize: 14,
      color: blackColor,
    },
    sectionTitle: {
      fontWeight: "bold",
      fontSize: 14,
      color: blackColor,
    },
    closeText: {
      fontWeight: "600",
      fontSize: 14,
      color: primaryColor,
    },
    infoBox: {
      padding: 24,
      backgroundColor: whiteColor,
    },
    rowHeader: {
      flexDirection: "row",
      alignItems: "center",
    },
    titleRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    mirrorIcon: {
      transform: [{ scaleX: -1 }],
    },
  });
