import {
  FlatList,
  View,
  StyleSheet,
  Pressable,
  Text,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SortDialog from "@/components/SortDialog";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchTransactions,
  setSortOption,
  setSearchQuery,
  selectDisplayedTransactions,
} from "@/features/transactions/transactionsSlice";
import TransactionItem from "@/components/TransactionItem";
import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { shallowEqual } from "react-redux";
import { Transaction } from "@/features/transactions/types";

export default function TransactionList() {
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
    return <ActivityIndicator size="large" style={styles.loader} />;
  if (status === "failed")
    return <Text style={styles.error}>Error: {error}</Text>;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <EvilIcons
            name="search"
            size={24}
            color="#A3A3A3"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Cari nama, bank, atau nominal"
            placeholderTextColor="#888"
            style={styles.searchInput}
            onChangeText={handleSearchChange}
            value={localSearchQuery}
            returnKeyType="search"
          />
        </View>
        <Pressable
          style={styles.sortButton}
          onPress={() => setSortModalVisible(true)}
          disabled={displayedData.length === 0}
        >
          <Text
            style={[
              styles.sortButtonText,
              displayedData.length === 0 && styles.disabledSort,
            ]}
          >
            URUTKAN
          </Text>
          <MaterialCommunityIcons
            name="chevron-down"
            size={30}
            color={displayedData.length === 0 ? "#cecece" : "#F26C39"}
          />
        </Pressable>
      </View>

      <FlatList
        data={displayedData}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={renderTransactionItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Image
              source={require("@/assets/images/empty-trx.png")}
              style={styles.emptyImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyTitle}>
              {`Kami tidak bisa menemukan "${localSearchQuery}"`}
            </Text>
            <Text style={styles.emptySubtitle}>
              Mohon cek lagi ejaannya atau ganti dengan nama, bank, atau nominal
              lain.
            </Text>
          </View>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5FAF8",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    marginRight: 4,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#A3A3A3",
    fontSize: 12,
    fontWeight: "500",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortButtonText: {
    color: "#F26C39",
    fontWeight: "bold",
    fontSize: 14,
  },
  disabledSort: {
    color: "#cecece",
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  emptyImage: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  emptyTitle: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#333",
  },
  loader: {
    marginTop: 50,
  },
  error: {
    textAlign: "center",
    marginTop: 20,
    color: "red",
  },
});
