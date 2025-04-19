import { SortOption } from "@/redux";

export const getSortOptionLabel = (
  options: ReadonlyArray<{ readonly key: SortOption; readonly label: string }>,
  sortOption: SortOption
): string => {
  if (sortOption === "default") {
    return "URUTKAN";
  }
  return options.find((el) => el.key === sortOption)?.label ?? "-";
};
