import { Transaction } from "@/redux";
import { filterAndSortTransactions } from "./transactionUtils";

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    amount: 100000,
    beneficiary_name: "Alice",
    sender_bank: "Bank A",
    beneficiary_bank: "Bank B",
    created_at: "2023-01-01",
    status: "SUCCESS",
    account_number: "1234567890",
    remark: "Payment for services",
    unique_code: 123,
  },
  {
    id: "2",
    amount: 50000,
    beneficiary_name: "Bob",
    sender_bank: "Bank C",
    beneficiary_bank: "Bank D",
    created_at: "2023-01-02",
    status: "PENDING",
    account_number: "1234567890",
    remark: "Payment for services",
    unique_code: 123,
  },
  {
    id: "3",
    amount: 75000,
    beneficiary_name: "Charlie",
    sender_bank: "Bank E",
    beneficiary_bank: "Bank F",
    created_at: "2023-01-03",
    status: "FAILED",
    account_number: "1234567890",
    remark: "Payment for services",
    unique_code: 123,
  },
];

describe("filterAndSortTransactions", () => {
  test("filters transactions by search query", () => {
    const result = filterAndSortTransactions(
      MOCK_TRANSACTIONS,
      "date-asc",
      "alice"
    );
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  test("sorts by name ascending", () => {
    const result = filterAndSortTransactions(MOCK_TRANSACTIONS, "name-asc", "");
    expect(result.map((t) => t.beneficiary_name)).toEqual([
      "Alice",
      "Bob",
      "Charlie",
    ]);
  });

  test("sorts by name descending", () => {
    const result = filterAndSortTransactions(
      MOCK_TRANSACTIONS,
      "name-desc",
      ""
    );
    expect(result.map((t) => t.beneficiary_name)).toEqual([
      "Charlie",
      "Bob",
      "Alice",
    ]);
  });

  test("sorts by date ascending", () => {
    const result = filterAndSortTransactions(MOCK_TRANSACTIONS, "date-asc", "");
    expect(result.map((t) => t.id)).toEqual(["1", "2", "3"]);
  });

  test("sorts by date descending", () => {
    const result = filterAndSortTransactions(
      MOCK_TRANSACTIONS,
      "date-desc",
      ""
    );
    expect(result.map((t) => t.id)).toEqual(["3", "2", "1"]);
  });

  test("combines filtering and sorting", () => {
    const result = filterAndSortTransactions(
      MOCK_TRANSACTIONS,
      "name-asc",
      "bank"
    );
    expect(result.map((t) => t.id)).toEqual(["1", "2", "3"]);
  });

  test("handles search query shorter than 3 characters", () => {
    const result = filterAndSortTransactions(
      MOCK_TRANSACTIONS,
      "date-asc",
      "al"
    );
    expect(result).toHaveLength(3);
  });

  test("searches in amount field", () => {
    const result = filterAndSortTransactions(
      MOCK_TRANSACTIONS,
      "date-asc",
      "100000"
    );
    expect(result[0].id).toBe("1");
  });

  test("returns original array when no sorting option", () => {
    const result = filterAndSortTransactions(
      MOCK_TRANSACTIONS,
      "none" as any,
      ""
    );
    expect(result).toEqual(MOCK_TRANSACTIONS);
  });
});
