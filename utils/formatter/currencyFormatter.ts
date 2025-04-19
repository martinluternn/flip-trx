export const formatCurrency = (amount?: number): string => {
  return `Rp${(amount || 0).toLocaleString("id-ID")}`;
};
