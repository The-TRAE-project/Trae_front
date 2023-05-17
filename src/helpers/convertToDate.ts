import dayjs from 'dayjs';

export const convertToDate = (date: number[]) =>
  dayjs(String(date).split(',').slice(0, 3).join('-') as string).toDate();
