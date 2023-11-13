import { Dayjs } from 'dayjs';
import { convertToDayjs } from '../../../helpers/convertToDayjs';
import { ProjectOperation } from '../../../store/apis/reports/types';

export const calculateDeviation = (
  plannedEnd: number[],
  shippingOperation: ProjectOperation | undefined
): number | null => {
  // console.log('Planned date: ', plannedEnd, 'RealEnd: ', realEnd);
  if (shippingOperation === undefined) {
    return null;
  }
  const plannedEndDate = convertToDayjs(plannedEnd);
  let realEndDate: Dayjs | undefined;
  if (shippingOperation.isEnded && !shippingOperation.acceptanceDate) {
    realEndDate = convertToDayjs(shippingOperation.realEndDate as number[]);
  } else if (shippingOperation.isEnded || shippingOperation.inWork) {
    realEndDate = convertToDayjs(shippingOperation.acceptanceDate as number[]);
  } else {
    realEndDate = convertToDayjs(shippingOperation.startDate);
  }
  const deviation = plannedEndDate.diff(realEndDate, 'd');

  return deviation;
};
