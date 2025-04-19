import { SortOption } from "@/redux";
import { getSortOptionLabel } from "./sortHelper";

const MOCK_SORT_OPTIONS: Array<{ key: SortOption; label: string }> = [
  { key: "date-asc", label: "Oldest First" },
  { key: "date-desc", label: "Newest First" },
];

describe("getSortOptionLabel", () => {
  it("returns correct label for existing option", () => {
    expect(getSortOptionLabel(MOCK_SORT_OPTIONS, "date-asc")).toBe(
      "Oldest First"
    );
  });

  it("returns '-' for non-existent option", () => {
    expect(getSortOptionLabel(MOCK_SORT_OPTIONS, "invalid" as any)).toBe("-");
  });

  it("handles empty options array", () => {
    expect(getSortOptionLabel([], "date-asc" as any)).toBe("-");
  });
});
