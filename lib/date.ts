export const getDayName = (date: Date): string => {
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

export const areDatesEqual = (date1: Date | string, date2: Date | string): boolean => {
  return unformatDate(date1).toISOString() === unformatDate(date2).toISOString();
};

/**
 * Unformat a date string to a Date object
 * @param dateString - Date string YYYY-MM-DD
 * @returns Date object
 */
export const unformatDate = (dateString: string | Date): Date => {
  if (typeof dateString === 'string') {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
  return dateString;
};

/**
 * Get the next available unique dates from an array of dates
 * @param dates - Array of dates
 * @param sliceCount - Number of unique dates to return
 * @returns Array of unique Date objects
 */
export const getNextAvailableDates = (dates: Date[], sliceCount: number): Date[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const availableDates = dates
    .filter((date) => date >= today)
    .sort((a, b) => a.getTime() - b.getTime());

  const dateStrings = availableDates.map((date) => date.toDateString());

  const uniqueDates = Array.from(new Set(dateStrings))
    .map((dateString) => new Date(dateString))
    .slice(0, sliceCount);

  return uniqueDates;
};
