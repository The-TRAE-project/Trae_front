import { convertToDayjs } from '../../../helpers/convertToDayjs';

export const calculateDeviation = (
  plannedEnd: number[],
  realEnd: number[] | undefined | null
): number | null => {
  if (realEnd === undefined || realEnd === null) {
    return null;
  }
  const plannedEndDate = convertToDayjs(plannedEnd);
  const realEndDate = convertToDayjs(realEnd);
  const deviation = plannedEndDate.diff(realEndDate, 'd');

  return deviation;
};
