import dayjs from 'dayjs';

export const convertToDate = (date: Date | number[] | undefined | null) => {
  if (date === undefined || date === null) {
    return null;
  }
  if (date instanceof Date && !Number.isNaN(date)) {
    return date;
  }
  if (Array.isArray(date)) {
    return dayjs(date.slice(0, 3).join('.')).toDate();
  }
  return null;
};
