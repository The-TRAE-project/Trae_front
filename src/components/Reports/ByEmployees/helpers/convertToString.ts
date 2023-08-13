import dayjs from 'dayjs';

export const convertToString = (date: number[]) =>
  dayjs(date.join('-')).format('YYYY-MM-DD');
