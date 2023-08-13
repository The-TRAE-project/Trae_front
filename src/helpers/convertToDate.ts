import dayjs from 'dayjs';

export const convertToDate = (date: number[]) => dayjs(date.join('-')).toDate();
