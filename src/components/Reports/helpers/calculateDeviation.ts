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
  const deviation = plannedEndDate.diff(realEndDate, 'd');

  return deviation;
};
