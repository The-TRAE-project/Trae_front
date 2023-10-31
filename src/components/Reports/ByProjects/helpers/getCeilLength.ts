import dayjs from 'dayjs';
import { convertToDayjs } from '../../../../helpers/convertToDayjs';
import { ProjectOperation } from '../../../../store/apis/reports/types';
import { getOperationStartDate } from './getOperationStartDate';

export function getCeilLength(
  dateStart: number[],
  dateEnd: number[],
  operationInfo: ProjectOperation,
  hoursforOperation: number,
  nextOperation?: ProjectOperation
) {
  if (operationInfo?.id === undefined) {
    return null;
  }

  const isNextOperation =
    nextOperation !== undefined &&
    !dayjs(getOperationStartDate(dateStart, nextOperation)).isAfter(
      convertToDayjs(dateEnd)
    );
  const minDate = convertToDayjs(dateStart);
  const maxDate = isNextOperation
    ? convertToDayjs(nextOperation.startDate)
    : convertToDayjs(dateEnd);

  let fullLength;
  if (operationInfo.isEnded) {
    fullLength = convertToDayjs(operationInfo.realEndDate as number[]).diff(
      convertToDayjs(
        (operationInfo.acceptanceDate !== null
          ? operationInfo.acceptanceDate
          : operationInfo.realEndDate) as number[]
      ),
      'd'
    );
  } else if (operationInfo.inWork) {
    fullLength = Math.max(
      dayjs().diff(
        convertToDayjs(operationInfo.acceptanceDate as number[]),
        'd'
      ),
      Math.ceil(hoursforOperation / 24)
    );
  } else {
    fullLength = Math.ceil(hoursforOperation / 24);
  }

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
    (maxDifference > 0 ? maxDifference - (isNextOperation ? 0 : 1) : 0);

  adjustedLength = adjustedLength <= 0 ? 1 : adjustedLength;

  return adjustedLength;
}
