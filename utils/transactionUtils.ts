import { SortOption, Transaction } from "@/redux";

export const filterAndSortTransactions = (
  data: Transaction[],
  option: SortOption,
  searchQuery: string
): Transaction[] => {
  const query = searchQuery.toLowerCase();
  const hasSearch = query.length >= 3;

  const filteredData = hasSearch
    ? data.filter((transaction) => {
        const amountString = transaction.amount.toString();
        return [
          transaction.beneficiary_name.toLowerCase(),
          transaction.sender_bank.toLowerCase(),
          transaction.beneficiary_bank.toLowerCase(),
          amountString,
        ].some((field) => field.includes(query));
      })
    : [...data];

  switch (option) {
    case "name-asc":
      return filteredData
        .slice()
        .sort((a, b) => a.beneficiary_name.localeCompare(b.beneficiary_name));
    case "name-desc":
      return filteredData
        .slice()
        .sort((a, b) => b.beneficiary_name.localeCompare(a.beneficiary_name));
    case "date-asc":
      return filteredData
        .slice()
        .sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
    case "date-desc":
      return filteredData
        .slice()
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    default:
      return filteredData;
  }
};
