import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./transactions/transactionsSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
