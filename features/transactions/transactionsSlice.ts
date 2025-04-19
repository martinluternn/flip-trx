import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import { SortOption, Transaction, TransactionsState } from "./types";
import type { RootState } from "@/redux/store";
import type { AxiosError } from "axios/index";

// Memoized selector for filtered/sorted data
const selectRawData = (state: RootState) => state.transactions.rawData;
const selectSortOption = (state: RootState) => state.transactions.sortOption;
const selectSearchQuery = (state: RootState) => state.transactions.searchQuery;

export const selectDisplayedTransactions = createSelector(
  [selectRawData, selectSortOption, selectSearchQuery],
  (rawData, sortOption, searchQuery) => {
    return filterAndSortTransactions(rawData, sortOption, searchQuery);
  }
);

export const fetchTransactions = createAsyncThunk<
  Transaction[],
  void,
  { state: RootState }
>("transactions/fetchTransactions", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<Record<string, Omit<Transaction, "id">>>(
      "https://recruitment-test.flip.id/frontend-test"
    );
    return Object.entries(data).map(([id, item]) => ({ id, ...item }));
  } catch (err) {
    const error = (err as any).isAxiosError
      ? (err as AxiosError).response?.data || (err as AxiosError).message
      : "Unknown error";
    return rejectWithValue(error);
  }
});

const initialState: TransactionsState = {
  rawData: [],
  displayedData: [],
  status: "idle",
  error: null,
  sortOption: "default",
  searchQuery: "",
};

const filterAndSortTransactions = (
  data: Transaction[],
  option: SortOption,
  searchQuery: string
): Transaction[] => {
  const query = searchQuery.toLowerCase();
  const hasSearch = query.length >= 3;

  // Filter first for better performance
  const filteredData = hasSearch
    ? data.filter((transaction) => {
        return (
          transaction.beneficiary_name.toLowerCase().includes(query) ||
          transaction.sender_bank.toLowerCase().includes(query) ||
          transaction.beneficiary_bank.toLowerCase().includes(query) ||
          transaction.amount.toString().includes(query)
        );
      })
    : [...data];

  // Sort with pre-computed values
  switch (option) {
    case "name-asc":
      return [...filteredData].sort((a, b) =>
        a.beneficiary_name.localeCompare(b.beneficiary_name)
      );
    case "name-desc":
      return [...filteredData].sort((a, b) =>
        b.beneficiary_name.localeCompare(a.beneficiary_name)
      );
    case "date-asc":
      return [...filteredData].sort(
        (a, b) => Date.parse(a.created_at) - Date.parse(b.created_at)
      );
    case "date-desc":
      return [...filteredData].sort(
        (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
      );
    default:
      return filteredData;
  }
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortOption = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rawData = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setSortOption, setSearchQuery } = transactionsSlice.actions;
export default transactionsSlice.reducer;
