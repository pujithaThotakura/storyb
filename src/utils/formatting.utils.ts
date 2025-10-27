// src/utils/formatting.utils.ts

/**
 * Formats a number as a locale-specific percentage string (e.g., 85%).
 * @param value The progress value (0 to 100).
 * @returns The formatted percentage string.
 */
export const formatProgress = (value: number): string => {
  // Ensure the value is clamped between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, value));
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(clampedValue / 100);
};

/**
 * Formats a number to be more readable for large values (e.g., 12000 -> 12K).
 * Useful if displaying total resource hours or budget figures.
 * @param num The number to format.
 * @param digits The number of decimal places to use.
 * @returns The formatted string.
 */
export const formatLargeNumber = (num: number, digits: number = 1): string => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" }
  ];
  const regex = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  
  return item ? (num / item.value).toFixed(digits).replace(regex, "$1") + item.symbol : "0";
};

/**
 * Formats a given date object into a standardized, easy-to-read date string (MM/DD/YYYY).
 * NOTE: For components, it's often better to use toLocaleDateString() for user locale, 
 * but this provides a guaranteed consistent standard format.
 * @param date The Date object to format.
 * @returns The formatted date string (e.g., "10/27/2025").
 */
export const formatStandardDate = (date: Date): string => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};