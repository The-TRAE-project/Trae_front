import dayjs from 'dayjs';

export const convertToDayjs = (date: number[]) =>
  dayjs(date.slice(0, 3).join('.'));
