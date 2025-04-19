import { formatIndonesianDate } from "./dateFormatter";

describe("formatIndonesianDate", () => {
  const mockConsoleError = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should format date correctly without time", () => {
    const date = "2023-04-19 08:30:00";
    expect(formatIndonesianDate(date)).toBe("19 April 2023");
  });

  it("should format date with time when showTime=true", () => {
    const date = "2023-12-31T16:45:00Z";
    expect(
      formatIndonesianDate(date, {
        showTime: true,
        timeZone: "WIB",
      })
    ).toBe("31 Desember 2023 23:45");
  });

  it("should handle date rollover with timezone", () => {
    const date = "2023-12-31T20:45:00Z";
    expect(
      formatIndonesianDate(date, {
        showTime: true,
        timeZone: "WIB",
      })
    ).toBe("1 Januari 2024 03:45");
  });

  it("should handle different time zones", () => {
    const date = "2023-04-19T00:00:00Z";
    expect(formatIndonesianDate(date, { timeZone: "WIB" })).toBe(
      "19 April 2023"
    );
    expect(formatIndonesianDate(date, { timeZone: "WITA" })).toBe(
      "19 April 2023"
    );
    expect(formatIndonesianDate(date, { timeZone: "WIT" })).toBe(
      "19 April 2023"
    );
  });

  it("should throw DateFormatError for invalid inputs", () => {
    expect(formatIndonesianDate("invalid-date")).toBe("-");
    expect(mockConsoleError).toHaveBeenCalledWith(
      expect.stringContaining("[DateFormatError] Format tanggal tidak valid")
    );
  });

  it("should handle edge cases", () => {
    expect(formatIndonesianDate("2023-01-01")).toBe("1 Januari 2023");
    expect(formatIndonesianDate("2023-12-31")).toBe("31 Desember 2023");
    expect(formatIndonesianDate("2024-02-29")).toBe("29 Februari 2024");
  });

  it("should handle error cases", () => {
    // @ts-ignore: Test invalid input type
    expect(formatIndonesianDate(12345)).toBe("-");
    expect(formatIndonesianDate("")).toBe("-");
  });
});
