import {
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { EvilIcons } from "@expo/vector-icons";
import { shallowEqual } from "react-redux";
import { SORT_MAP_OPTIONS, Transaction } from "@/redux/transactions/types/transactionsTypes";
import {
  fetchTransactions,
  selectDisplayedTransactions,
  setSearchQuery,
  setSortOption,
} from "@/redux";
import { useThemeColor } from "@/hooks";
import {
  EmptyView,
  IconTextButton,
  SortDialog,
  Spacer,
  TransactionItem,
} from "@/components";
import { getSortOptionLabel } from "@/utils";

export default function TransactionList() {
  // Theme colors
  const primaryColor = useThemeColor("primaryColor");
  const textPrimary = useThemeColor("textPrimary");
  const textSecondary = useThemeColor("textSecondary");
  const disabledColor = useThemeColor("disabled");
  const errorColor = useThemeColor("failed");
  const whiteColor = useThemeColor("white");

  // Memoized styles
  const styles = useMemo(
    () => createStyles(primaryColor, textPrimary, whiteColor),
    [
      primaryColor,
      textPrimary,
      textSecondary,
      disabledColor,
      errorColor,
      whiteColor,
    ]
  );

  const dispatch = useDispatch<AppDispatch>();
  const { status, error, sortOption } = useSelector(
    (state: RootState) => ({
      displayedData: state.transactions.displayedData,
      status: state.transactions.status,
      error: state.transactions.error,
      sortOption: state.transactions.sortOption,
      searchQuery: state.transactions.searchQuery,
    }),
    shallowEqual
  );
  const displayedData = useSelector(selectDisplayedTransactions);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchTransactions());
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(fetchTransactions());
    setRefreshing(false);
  }, [dispatch]);

  const handleSearchChange = useCallback(
    (text: string) => {
      setLocalSearchQuery(text);
      timeoutRef.current && clearTimeout(timeoutRef.current);
      if (text.length < 3) {
        dispatch(setSearchQuery(""));
        return;
      }
      timeoutRef.current = setTimeout(() => {
        dispatch(setSearchQuery(text));
      }, 300);
    },
    [dispatch]
  );

  const renderTransactionItem = useCallback(
    ({ item }: { item: Transaction }) => <TransactionItem {...item} />,
    []
  );

  if (status === "loading")
    return (
      <>
        <Spacer size={"xxl"} />
        <Spacer size={"sm"} />
        <ActivityIndicator size="large" color={primaryColor} />
      </>
    );
  if (status === "failed")
    return <EmptyView title={`Terjadi kesalahan`} subtitle={error ?? "-"} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <EvilIcons
            name="search"
            size={24}
            color={localSearchQuery.length > 0 ? textPrimary : textSecondary}
          />
          <Spacer size={"xs"} horizontal />
          <TextInput
            placeholder="Cari nama, bank, atau nominal"
            placeholderTextColor={textSecondary}
            style={styles.searchInput}
            onChangeText={handleSearchChange}
            value={localSearchQuery}
            returnKeyType="search"
          />
        </View>
        <IconTextButton
          iconName="chevron-down"
          text={getSortOptionLabel(SORT_MAP_OPTIONS, sortOption)}
          onPress={() => setSortModalVisible(true)}
          disabled={displayedData.length === 0}
          iconSize={30}
          iconColor={primaryColor}
          disabledColor={disabledColor}
          textStyle={styles.sortButtonText}
          containerStyle={styles.sortButton}
        />
      </View>
      <Spacer size={"sm"} />
      <Spacer size={"xs"} />
      <FlatList
        data={displayedData}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={renderTransactionItem}
        ListEmptyComponent={
          <EmptyView
            title={`Kami tidak bisa menemukan "${localSearchQuery}"`}
            subtitle="Mohon cek lagi ejaannya atau ganti dengan nama, bank, atau nominal
              lain."
          />
        }
        initialNumToRender={10}
      />
      <SortDialog
        visible={sortModalVisible}
        onClose={() => setSortModalVisible(false)}
        selected={sortOption}
        onSelect={(option) => {
          dispatch(setSortOption(option));
          setSortModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}

const createStyles = (
  primaryColor: string,
  textPrimary: string,
  whiteColor: string
) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginHorizontal: 8,
      padding: 8,
      borderRadius: 6,
      backgroundColor: whiteColor,
    },
    searchContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
    },
    searchInput: {
      flex: 1,
      height: 40,
      fontSize: 12,
      fontWeight: "500",
      color: textPrimary,
    },
    sortButton: {
      flexDirection: "row",
      alignItems: "center",
    },
    sortButtonText: {
      fontWeight: "bold",
      fontSize: 14,
      color: primaryColor,
    },
  });
