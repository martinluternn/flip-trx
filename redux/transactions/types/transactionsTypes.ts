import { STRINGS } from "@/constants";

export interface Transaction {
  id: string;
  amount: number;
  sender_bank: string;
  beneficiary_bank: string;
  beneficiary_name: string;
  account_number: string;
  remark: string;
  unique_code: number;
  created_at: string;
  status: string;
}

export interface TransactionsState {
  rawData: Transaction[];
  displayedData: Transaction[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  sortOption: SortOption;
  searchQuery: string;
}

export type SortOption =
  | "default"
  | "name-asc"
  | "name-desc"
  | "date-asc"
  | "date-desc";

export const SORT_MAP_OPTIONS = [
  { key: "default", label: STRINGS.SORT_OPTIONS.DEFAULT },
  { key: "name-asc", label: STRINGS.SORT_OPTIONS.NAME_ASC },
  { key: "name-desc", label: STRINGS.SORT_OPTIONS.NAME_DESC },
  { key: "date-desc", label: STRINGS.SORT_OPTIONS.DATE_DESC },
  { key: "date-asc", label: STRINGS.SORT_OPTIONS.DATE_ASC },
] as const;
