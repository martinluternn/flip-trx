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
      throw new DateFormatError("input should be a date string");
    }

    const isoDateString = dateString.replace(" ", "T") + "Z";
    const parsedDate = new Date(isoDateString);

    if (isNaN(parsedDate.getTime())) {
      throw new DateFormatError("date string tidak valid");
    }

    const timeZoneOffset =
      options.timeZone === "WITA" ? 8 : options.timeZone === "WIT" ? 9 : 7;
    const localDate = new Date(
      parsedDate.getTime() + timeZoneOffset * 60 * 60 * 1000
    );

    const bulan: string[] = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const day: number = localDate.getUTCDate();
    const monthIndex: number = localDate.getUTCMonth();
    const year: number = localDate.getUTCFullYear();

    if (monthIndex < 0 || monthIndex > 11) {
      throw new DateFormatError("month index out of range");
    }

    let formattedDate = `${day} ${bulan[monthIndex]} ${year}`;

    if (options.showTime) {
      const hours: string = localDate.getUTCHours().toString().padStart(2, "0");
      const minutes: string = localDate
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
