import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTransactions } from "./thunks/transactionsThunks";
import { SortOption, TransactionsState } from "./types/transactionsTypes";

const initialState: TransactionsState = {
  rawData: [],
  displayedData: [],
  status: "idle",
  error: null,
  sortOption: "default",
  searchQuery: "",
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
