export const formatBankName = (name: string) => {
  if (!name) return "";

  if (name.length <= 4) {
    return name.toUpperCase();
  } else {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
};
