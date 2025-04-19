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

export type SortOption = "default" | "name-asc" | "name-desc" | "date-asc" | "date-desc";
