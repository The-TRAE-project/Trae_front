import { convertToDayjs } from '../../../helpers/convertToDayjs';

export const calculateDeviation = (
  plannedEnd: number[],
  realEnd: number[] | null
) => {
  if (realEnd === null) {
    return null;
  }

  const plannedEndDate = convertToDayjs(plannedEnd);
  const realEndDate = convertToDayjs(realEnd);
  let deviation = 0;
  if (plannedEndDate.isBefore(realEndDate)) {
    deviation = plannedEndDate.diff(realEndDate, 'd');
  } else {
    deviation = realEndDate.diff(plannedEndDate, 'd');
  }

  return deviation;
};
