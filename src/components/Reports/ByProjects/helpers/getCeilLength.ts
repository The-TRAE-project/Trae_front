import { convertToDayjs } from '../../../../helpers/convertToDayjs';
import { ProjectOperation } from '../../../../store/apis/reports/types';

export function getCeilLength(
  dateStart: number[],
  dateEnd: number[],
  operationInfo: ProjectOperation | undefined,
  hoursforOperation: number
) {
  if (operationInfo?.id === undefined) {
    return null;
  }

  const minDate = convertToDayjs(dateStart);
  const maxDate = convertToDayjs(dateEnd);

  const fullLength = Math.ceil(hoursforOperation / 24);

  const minDiffernce = minDate.diff(
    convertToDayjs(operationInfo.startDate),
    'd'
  );
  const maxDiffernece = convertToDayjs(operationInfo.startDate)
    .add(fullLength, 'd')
    .diff(maxDate, 'd');

  let adjustedLength =
    fullLength -
    (minDiffernce > 0 ? minDiffernce : 0) -
    (maxDiffernece > 0 ? maxDiffernece - 1 : 0);

  adjustedLength = adjustedLength <= 0 ? 1 : adjustedLength;

  return adjustedLength;
}
