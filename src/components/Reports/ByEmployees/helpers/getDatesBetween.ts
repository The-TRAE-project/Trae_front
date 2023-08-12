import dayjs from 'dayjs';

// TODO: optimization
export const getDatesBetween = (startDate: Date, endDate: Date) => {
  const currentDate = new Date(startDate.getTime());
  const dates = [];
  while (currentDate <= endDate) {
    dates.push(dayjs(new Date(currentDate)).format('YYYY-MM-DD'));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};
