import dayjs from 'dayjs';

export const convertToString = (date: number[]) =>
  dayjs(date.slice(0, 3).join('-')).format('YYYY-MM-DD');
