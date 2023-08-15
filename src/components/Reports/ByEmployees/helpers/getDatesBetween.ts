import dayjs from 'dayjs';

export const getDatesBetween = (startDate: Date, endDate: Date) => {
  let currentDate = dayjs(startDate);
  const lastDate = dayjs(endDate);
  const dates = [];
  while (currentDate.isBefore(lastDate)) {
    dates.push(currentDate.format('YYYY-MM-DD'));
    currentDate = currentDate.add(1, 'day');
  }
  return dates;
};
