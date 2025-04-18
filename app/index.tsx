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
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchTransactions,
  setSortOption,
  setSearchQuery,
} from "@/features/transactions/transactionsSlice";
import TransactionItem from "@/components/TransactionItem";
import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function TransactionList() {
  const dispatch = useDispatch<AppDispatch>();
  const { displayedData, status, error, sortOption } = useSelector(
    (state: RootState) => state.transactions
  );

  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchTransactions());
    setRefreshing(false);
  };

  const handleSearchChange = (text: string) => {
    setLocalSearchQuery(text);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (text.length < 3) {
      dispatch(setSearchQuery(""));
      return;
    }

    timeoutRef.current = setTimeout(() => {
      dispatch(setSearchQuery(text));
    }, 300);
  };

  if (status === "loading")
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  if (status === "failed") return <Text>Error: {error}</Text>;

  const emptyList = () => {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={require("@/assets/images/empty-trx.png")}
          style={styles.emptyImage}
          resizeMode="contain"
        />
        <Text
          style={styles.emptyTitle}
        >{`Kami tidak bisa menemukan "${localSearchQuery}"`}</Text>
        <Text style={styles.emptySubtitle}>
          Mohon cek lagi ejaannya atau ganti dengan nama, bank, atau nominal
          lain.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#F5FAF8", paddingTop: 16 }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          marginHorizontal: 8,
          padding: 8,
          borderRadius: 6,
          marginBottom: 12,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <EvilIcons
            name="search"
            size={24}
            color="#A3A3A3"
            style={{ marginRight: 4 }}
          />
          <TextInput
            placeholder="Cari nama, bank, atau nominal"
            placeholderTextColor="#888"
            style={{
              flex: 1,
              height: 40,
              color: "#A3A3A3",
              fontSize: 12,
              fontWeight: "500",
            }}
            onChangeText={(text: string) => {
              if (displayedData.length === 0 && localSearchQuery.length === 0) {
                return;
              }
              handleSearchChange(text);
            }}
            value={localSearchQuery}
          />
        </View>
        <Pressable
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => setSortModalVisible(true)}
          disabled={displayedData.length === 0}
        >
          <Text
            style={{
              color: displayedData.length === 0 ? "#cecece" : "#F26C39",
              fontWeight: "bold",
              fontSize: 14,
            }}
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

      {displayedData.length === 0 && localSearchQuery.length > 0 ? (
        emptyList()
      ) : (
        <FlatList
          data={displayedData}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => <TransactionItem {...item} />}
        />
      )}

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
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
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
});
