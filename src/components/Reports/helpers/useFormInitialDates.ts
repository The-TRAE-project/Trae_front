import dayjs from 'dayjs';

export const useFormInitialDates = () => {
  const formInitialDateEnd = dayjs().toDate();
  let formInitialDateStart;
  if (formInitialDateEnd.getDate() <= 7) {
    formInitialDateStart = dayjs().subtract(7, 'day').toDate();
  } else {
    formInitialDateStart = dayjs().set('date', 1).toDate();
  }

  return [formInitialDateStart, formInitialDateEnd];
};
