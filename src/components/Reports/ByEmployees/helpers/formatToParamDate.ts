import dayjs from 'dayjs';

export const DATE_30_AHEAD = dayjs(new Date()).add(30, 'days').toDate();

export const formatToQueryParamDate = (date: Date | string) =>
  dayjs(date).format('YYYY-MM-DD');
