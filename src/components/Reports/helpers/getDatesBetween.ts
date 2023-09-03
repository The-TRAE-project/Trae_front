import { convertToDayjs } from '../../../helpers/convertToDayjs';

export const getDatesBetween = (startDate: number[], endDate: number[]) => {
  let currentDate = convertToDayjs(startDate);
  const lastDate = convertToDayjs(endDate);
  const dates = [];
  while (currentDate.isBefore(lastDate) || currentDate.isSame(lastDate)) {
    dates.push(currentDate.format('YYYY-MM-DD'));
    currentDate = currentDate.add(1, 'day');
  }
  return dates;
};
