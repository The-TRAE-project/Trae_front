import dayjs from 'dayjs';

export const formatDate = (date: Date | string) =>
  dayjs(String(date).split(',').slice(0, 3).join('-') as string).format(
    'DD.MM.YYYY'
  );
