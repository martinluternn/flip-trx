type Status = "PENDING" | "SUCCESS" | "FAILED" | string;

export const StatusFormatter = {
  translate: (status: Status): string => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "Pengecekan";
      case "SUCCESS":
        return "Berhasil";
      case "FAILED":
        return "Gagal";
      default:
        return status;
    }
  },

  getBadgeColor: (status: Status): string => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "#FD6345";
      case "SUCCESS":
        return "#56B683";
      case "FAILED":
        return "#C5231F";
      default:
        return "#95a5a6";
    }
  },

  getBackgroundColor: (status: Status): string => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "transparent";
      case "SUCCESS":
        return "#56B683";
      case "FAILED":
        return "#C5231F";
      default:
        return "transparent";
    }
  },

  getBorderColor: (status: Status): string => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "#FD6345";
      case "SUCCESS":
        return "transparent";
      case "FAILED":
        return "transparent";
      default:
        return "transparent";
    }
  },

  getTextColor: (status: Status): string => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "#000000";
      case "SUCCESS":
        return "#FFFFFF";
      case "FAILED":
        return "#FFFFFF";
      default:
        return "#FFFFFF";
    }
  },
};
