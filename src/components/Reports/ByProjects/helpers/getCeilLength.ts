import { convertToDayjs } from '../../../../helpers/convertToDayjs';
import { ProjectOperation } from '../../../../store/apis/reports/types';

export function getCeilLength(
  dateStart: number[],
  dateEnd: number[],
  operationInfo: ProjectOperation,
  hoursforOperation: number
) {
  if (operationInfo?.id === undefined) {
    return null;
  }

  const minDate = convertToDayjs(dateStart);
  const maxDate = convertToDayjs(dateEnd);

  const fullLength = operationInfo.isEnded
    ? convertToDayjs(operationInfo.realEndDate as number[]).diff(
        convertToDayjs(
          (operationInfo.acceptanceDate !== null
            ? operationInfo.acceptanceDate
            : operationInfo.realEndDate) as number[]
        ),
        'd'
      )
    : Math.ceil(hoursforOperation / 24);
  const minDifference = minDate.diff(
    convertToDayjs(operationInfo.startDate),
    'd'
  );
  const maxDifference = convertToDayjs(operationInfo.startDate)
    .add(fullLength, 'd')
    .diff(maxDate, 'd');

  let adjustedLength =
    fullLength -
    (minDifference > 0 ? minDifference : 0) -
    (maxDifference > 0 ? maxDifference - 1 : 0);

  adjustedLength = adjustedLength <= 0 ? 1 : adjustedLength;

  return adjustedLength;
}
