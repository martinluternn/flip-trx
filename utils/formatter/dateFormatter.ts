import { STRINGS } from "@/constants";

export interface IndonesianDateOptions {
  showTime?: boolean;
  timeZone?: "WIB" | "WITA" | "WIT";
}

export class DateFormatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DateFormatError";
  }
}

export const formatIndonesianDate = (
  dateString: string,
  options: IndonesianDateOptions = {}
): string => {
  try {
    if (!dateString || typeof dateString !== "string") {
      throw new DateFormatError(STRINGS.ERROR_MESSAGES.DATE_INPUT_ERROR);
    }

    let isoDateString = dateString;
    if (!isoDateString.includes("T")) {
      isoDateString = isoDateString.replace(" ", "T");
    }
    if (!isoDateString.endsWith("Z") && !isoDateString.includes("+")) {
      isoDateString += "Z";
    }

    const parsedDate = new Date(isoDateString);

    if (isNaN(parsedDate.getTime())) {
      throw new DateFormatError(STRINGS.ERROR_MESSAGES.DATE_INVALID);
    }

    const timeZoneOffset =
      options.timeZone === "WITA" ? 8 : options.timeZone === "WIT" ? 9 : 7; // Default to WIB (UTC+7)

    const adjustedTime = parsedDate.getTime() + timeZoneOffset * 60 * 60 * 1000;
    const adjustedDate = new Date(adjustedTime);

    const bulan: string[] = [
      STRINGS.MONTH.JANUARY,
      STRINGS.MONTH.FEBRUARY,
      STRINGS.MONTH.MARCH,
      STRINGS.MONTH.APRIL,
      STRINGS.MONTH.MAY,
      STRINGS.MONTH.JUNE,
      STRINGS.MONTH.JULY,
      STRINGS.MONTH.AUGUST,
      STRINGS.MONTH.SEPTEMBER,
      STRINGS.MONTH.OCTOBER,
      STRINGS.MONTH.NOVEMBER,
      STRINGS.MONTH.DECEMBER,
    ];

    const day: number = adjustedDate.getUTCDate();
    const monthIndex: number = adjustedDate.getUTCMonth();
    const year: number = adjustedDate.getUTCFullYear();

    if (monthIndex < 0 || monthIndex > 11) {
      throw new DateFormatError(
        STRINGS.ERROR_MESSAGES.MONTH_INDEX_OUT_OF_RANGE
      );
    }

    let formattedDate = `${day} ${bulan[monthIndex]} ${year}`;

    if (options.showTime) {
      const hours: string = adjustedDate
        .getUTCHours()
        .toString()
        .padStart(2, "0");
      const minutes: string = adjustedDate
        .getUTCMinutes()
        .toString()
        .padStart(2, "0");
      formattedDate += ` ${hours}:${minutes}`;
    }

    return formattedDate;
  } catch (error) {
    if (error instanceof DateFormatError) {
      console.error(`[DateFormatError] ${error.message}`);
      return "-";
    }
    console.error("[Unknown Error]", error);
    return "-";
  }
};
