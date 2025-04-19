import { RootState } from "@/redux";
import { filterAndSortTransactions } from "@/utils";
import { createSelector } from "@reduxjs/toolkit";

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
