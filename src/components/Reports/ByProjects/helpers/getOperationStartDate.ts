import { convertToDayjs } from '../../../../helpers/convertToDayjs';
import { convertToString } from '../../../../helpers/convertToString';

export function getOperationStartDate(
  repStartDate: number[],
  opStartDate: number[],
  opEndDate: number[]
) {
  const reportStartDate = convertToDayjs(repStartDate);
  const operationStartDate = convertToDayjs(opStartDate);
  const operationEndDate = convertToDayjs(opEndDate);

  if (
    operationStartDate.isBefore(reportStartDate) &&
    (operationEndDate.isAfter(reportStartDate) ||
      operationEndDate.isSame(reportStartDate))
  ) {
    return convertToString(repStartDate);
  }

  return convertToString(opStartDate);
}
