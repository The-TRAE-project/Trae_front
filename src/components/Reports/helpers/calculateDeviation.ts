import { convertToDayjs } from '../../../helpers/convertToDayjs';

export const calculateDeviation = (
  plannedEnd: number[],
  realEnd: number[] | undefined | null
): number | null => {
  if (realEnd === undefined || realEnd === null) {
    return null;
  }
  const plannedEndDate = convertToDayjs(plannedEnd);
  const deviation = plannedEndDate.diff(convertToDayjs(realEnd), 'd');

  return deviation;
};
