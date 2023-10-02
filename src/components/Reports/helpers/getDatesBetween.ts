import { convertToDayjs } from '../../../helpers/convertToDayjs';

export const getDatesBetween = (startDate: number[], endDate: number[]) => {
  let currentDate = convertToDayjs(startDate);
  const lastDate = convertToDayjs(endDate);
  const dates = [];
  const numberOfDays = lastDate.diff(currentDate, 'd') + 1;
  let counter = 0;
  while (counter < numberOfDays) {
    dates.push(currentDate.format('YYYY-MM-DD'));
    counter += 1;
    currentDate = currentDate.add(1, 'd');
  }
  return dates;
};
