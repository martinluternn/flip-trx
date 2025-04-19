import { StatusFormatter } from "./statusFormatter";

describe("StatusFormatter", () => {
  const testCases = [
    { status: "PENDING", expected: "Pengecekan" },
    { status: "SUCCESS", expected: "Berhasil" },
    { status: "FAILED", expected: "Gagal" },
    { status: "UNKNOWN", expected: "UNKNOWN" },
  ];

  describe("translate", () => {
    testCases.forEach(({ status, expected }) => {
      it(`should translate ${status} to ${expected}`, () => {
        expect(StatusFormatter.translate(status)).toBe(expected);
        expect(StatusFormatter.translate(status.toLowerCase())).toBe(expected);
      });
    });
  });

  describe("getBadgeColor", () => {
    const colors = {
      PENDING: "#FD6345",
      SUCCESS: "#56B683",
      FAILED: "#C5231F",
      default: "#95a5a6",
    };

    testCases.forEach(({ status }) => {
      it(`should return correct color for ${status}`, () => {
        const expected =
          colors[status as keyof typeof colors] || colors.default;
        expect(StatusFormatter.getBadgeColor(status)).toBe(expected);
      });
    });
  });

  describe("getBackgroundColor", () => {
    const colors = {
      PENDING: "transparent",
      SUCCESS: "#56B683",
      FAILED: "#C5231F",
      default: "transparent",
    };

    testCases.forEach(({ status }) => {
      it(`should return correct background color for ${status}`, () => {
        const expected =
          colors[status as keyof typeof colors] || colors.default;
        expect(StatusFormatter.getBackgroundColor(status)).toBe(expected);
      });
    });
  });

  describe("getTextColor", () => {
    const colors = {
      PENDING: "#000000",
      SUCCESS: "#FFFFFF",
      FAILED: "#FFFFFF",
      default: "#FFFFFF",
    };

    testCases.forEach(({ status }) => {
      it(`should return correct text color for ${status}`, () => {
        const expected =
          colors[status as keyof typeof colors] || colors.default;
        expect(StatusFormatter.getTextColor(status)).toBe(expected);
      });
    });
  });

  describe("getBorderColor", () => {
    const colors = {
      PENDING: "#FD6345",
      SUCCESS: "transparent",
      FAILED: "transparent",
      default: "transparent",
    };

    testCases.forEach(({ status }) => {
      it(`should return correct border color for ${status}`, () => {
        const expected =
          colors[status as keyof typeof colors] || colors.default;
        expect(StatusFormatter.getBorderColor(status)).toBe(expected);
      });
    });
  });
});
