import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { SortOption, Transaction, TransactionsState } from "./types";

export const fetchTransactions = createAsyncThunk<Transaction[]>(
  "transactions/fetchTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://recruitment-test.flip.id/frontend-test"
      );
      return Object.entries(res.data as Record<string, any>).map(
        ([id, item]) => ({
          id,
          ...item,
        })
      ) as Transaction[];
    } catch (err: any) {
      return rejectWithValue(err.message || "Unknown error");
    }
  }
);

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
  let processedData = [...data];

  if (searchQuery.length >= 3) {
    const query = searchQuery.toLowerCase();
    processedData = processedData.filter((transaction) => {
      return (
        transaction.beneficiary_name.toLowerCase().includes(query) ||
        transaction.sender_bank.toLowerCase().includes(query) ||
        transaction.beneficiary_bank.toLowerCase().includes(query) ||
        transaction.amount.toString().includes(query)
      );
    });
  }

  switch (option) {
    case "name-asc":
      return processedData.sort((a, b) =>
        a.beneficiary_name.localeCompare(b.beneficiary_name)
      );
    case "name-desc":
      return processedData.sort((a, b) =>
        b.beneficiary_name.localeCompare(a.beneficiary_name)
      );
    case "date-asc":
      return processedData.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    case "date-desc":
    case "default":
      return processedData.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    default:
      return processedData;
  }
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortOption = action.payload;
      state.displayedData = filterAndSortTransactions(
        state.rawData,
        action.payload,
        state.searchQuery || ""
      );
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.displayedData = filterAndSortTransactions(
        state.rawData,
        state.sortOption,
        action.payload
      );
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
        state.displayedData = filterAndSortTransactions(
          action.payload,
          state.sortOption,
          state.searchQuery || ""
        );
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setSortOption, setSearchQuery } = transactionsSlice.actions;
export default transactionsSlice.reducer;
