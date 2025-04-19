import { STRINGS } from "@/constants";
import { SortOption } from "@/redux";

export const getSortOptionLabel = (
  options: ReadonlyArray<{ readonly key: SortOption; readonly label: string }>,
  sortOption: SortOption
): string => {
  if (sortOption === "default") {
    return STRINGS.SORT_OPTIONS.DEFAULT;
  }
  return options.find((el) => el.key === sortOption)?.label ?? STRINGS.COMMON.NOT_FOUND;
};
