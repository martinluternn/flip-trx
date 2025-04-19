import { formatBankName } from "./bankFormatter";

describe("formatBankName", () => {
  it("should return empty string for empty input", () => {
    expect(formatBankName("")).toBe("");
    expect(formatBankName(null as any)).toBe("");
    expect(formatBankName(undefined as any)).toBe("");
  });

  it("should uppercase names with length <= 4", () => {
    expect(formatBankName("bca")).toBe("BCA");
    expect(formatBankName("mdr")).toBe("MDR");
    expect(formatBankName("dbs")).toBe("DBS");
  });

  it("should capitalize first letter and lowercase others for longer names", () => {
    expect(formatBankName("mandiri")).toBe("Mandiri");
    expect(formatBankName("BANK NEGARA INDONESIA")).toBe(
      "Bank negara indonesia"
    );
    expect(formatBankName("cimbNiaga")).toBe("Cimbniaga");
  });

  it("should handle special characters and numbers", () => {
    expect(formatBankName("bank-123")).toBe("Bank-123");
    expect(formatBankName("uob@prime")).toBe("Uob@prime");
  });
});
