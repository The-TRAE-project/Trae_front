import dayjs from 'dayjs';
import { convertToString } from '../../../../helpers/convertToString';

export const getDatesBetween = (startDate: number[], endDate: number[]) => {
  let currentDate = dayjs(convertToString(startDate));
  const lastDate = dayjs(convertToString(endDate));
  const dates = [];
  while (currentDate.isBefore(lastDate)) {
    dates.push(currentDate.format('YYYY-MM-DD'));
    currentDate = currentDate.add(1, 'day');
  }
  return dates;
};
