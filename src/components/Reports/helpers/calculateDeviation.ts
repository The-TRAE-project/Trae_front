import dayjs from 'dayjs';
import { convertToString } from '../../../helpers/convertToString';

export const calculateDeviation = (
  plannedEnd: number[],
  realEnd: number[] | null
) => {
  if (realEnd === null) {
    return null;
  }

  let plannedEndDate = dayjs(convertToString(plannedEnd));
  let realEndDate = dayjs(convertToString(realEnd));
  let deviation = 0;
  if (plannedEndDate.isBefore(realEndDate)) {
    while (plannedEndDate.isBefore(realEndDate)) {
      deviation += 1;
      plannedEndDate = plannedEndDate.add(1, 'day');
    }
  } else {
    while (realEndDate.isBefore(plannedEndDate)) {
      deviation -= 1;
      realEndDate = realEndDate.add(1, 'day');
    }
  }

  return deviation;
};
