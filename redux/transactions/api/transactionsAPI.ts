import axios from "axios";

export const transactionsAPI = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const Endpoints = {
  TRANSACTIONS: process.env.REACT_APP_TRANSACTIONS_ENDPOINT,
};
