import dayjs from 'dayjs';

export const convertToString = (date: number[], join: '-' | '.' = '-') =>
  dayjs(date.slice(0, 3).join('.')).format(`YYYY${join}MM${join}DD`);
