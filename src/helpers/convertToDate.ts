import dayjs from 'dayjs';

export const convertToDate = (date: number[]) =>
  dayjs(date.slice(0, 3).join('.')).toDate();
