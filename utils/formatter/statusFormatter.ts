import { STRINGS } from "@/constants";

type Status = "PENDING" | "SUCCESS" | "FAILED" | string;

export const StatusFormatter = {
  translate: (status: Status): string => {
    const upperStatus = status.toUpperCase();
    switch (upperStatus) {
      case STRINGS.STATUS.PENDING_TEXT:
        return STRINGS.STATUS.PENDING;
      case STRINGS.STATUS.SUCCESS_TEXT:
        return STRINGS.STATUS.SUCCESS;
      case STRINGS.STATUS.FAILED_TEXT:
        return STRINGS.STATUS.FAILED;
      default:
        return upperStatus;
    }
  },

  getBadgeColor: (status: Status): string => {
    switch (status.toUpperCase()) {
      case STRINGS.STATUS.PENDING_TEXT:
        return "#FD6345";
      case STRINGS.STATUS.SUCCESS_TEXT:
        return "#56B683";
      case STRINGS.STATUS.FAILED_TEXT:
        return "#C5231F";
      default:
        return "#95a5a6";
    }
  },

  getBackgroundColor: (status: Status): string => {
    switch (status.toUpperCase()) {
      case STRINGS.STATUS.PENDING_TEXT:
        return "transparent";
      case STRINGS.STATUS.SUCCESS_TEXT:
        return "#56B683";
      case STRINGS.STATUS.FAILED_TEXT:
        return "#C5231F";
      default:
        return "transparent";
    }
  },

  getBorderColor: (status: Status): string => {
    switch (status.toUpperCase()) {
      case STRINGS.STATUS.PENDING_TEXT:
        return "#FD6345";
      case STRINGS.STATUS.SUCCESS_TEXT:
        return "transparent";
      case STRINGS.STATUS.FAILED_TEXT:
        return "transparent";
      default:
        return "transparent";
    }
  },

  getTextColor: (status: Status): string => {
    switch (status.toUpperCase()) {
      case STRINGS.STATUS.PENDING_TEXT:
        return "#000000";
      case STRINGS.STATUS.SUCCESS_TEXT:
        return "#FFFFFF";
      case STRINGS.STATUS.FAILED_TEXT:
        return "#FFFFFF";
      default:
        return "#FFFFFF";
    }
  },
};
