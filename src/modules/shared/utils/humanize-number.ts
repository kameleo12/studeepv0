export function humanizeNumber(num: number): string {
  const truncateToOneDecimal = (n: number): string => {
    return Math.floor(n * 10) / 10 + "";
  };

  if (num >= 1e12) {
    return truncateToOneDecimal(num / 1e12) + "T";
  } else if (num >= 1e9) {
    return truncateToOneDecimal(num / 1e9) + "B";
  } else if (num >= 1e6) {
    return truncateToOneDecimal(num / 1e6) + "M";
  } else if (num >= 1e3) {
    return truncateToOneDecimal(num / 1e3) + "K";
  } else {
    return num.toString();
  }
}
