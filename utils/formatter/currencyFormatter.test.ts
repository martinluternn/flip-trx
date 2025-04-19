import { formatCurrency } from "./currencyFormatter";

describe("formatCurrency", () => {
  it("formats positive numbers correctly", () => {
    expect(formatCurrency(10000)).toBe("Rp10.000");
    expect(formatCurrency(2500000)).toBe("Rp2.500.000");
  });

  it("handles zero value", () => {
    expect(formatCurrency(0)).toBe("Rp0");
  });

  it("handles undefined input", () => {
    expect(formatCurrency(undefined)).toBe("Rp0");
  });

  it("formats negative numbers correctly", () => {
    expect(formatCurrency(-5000)).toBe("Rp-5.000");
  });

  it("handles decimal values", () => {
    expect(formatCurrency(1234.56)).toBe("Rp1.234,56");
  });
});
