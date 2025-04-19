import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import type { AxiosError } from "axios/index";
import { transactionsAPI, Endpoints } from "../api/transactionsAPI";
import { Transaction } from "../types/transactionsTypes";
import { STRINGS } from "@/constants";

export const fetchTransactions = createAsyncThunk<
  Transaction[],
  void,
  { state: RootState }
>("transactions/fetchTransactions", async (_, { rejectWithValue }) => {
  try {
    const { data } = await transactionsAPI.get<
      Record<string, Omit<Transaction, "id">>
    >(Endpoints.TRANSACTIONS ?? "");
    return Object.entries(data).map(([id, item]) => ({ id, ...item }));
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(
      error.response?.data || error.message || STRINGS.COMMON.UNKNOWN_ERROR
    );
  }
});
