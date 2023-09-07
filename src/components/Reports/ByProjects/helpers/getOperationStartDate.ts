import { convertToDayjs } from '../../../../helpers/convertToDayjs';
import { convertToString } from '../../../../helpers/convertToString';
import { ProjectOperation } from '../../../../store/apis/reports/types';

export function getOperationStartDate(
  repStartDate: number[],
  operation: ProjectOperation
) {
  const reportStartDate = convertToDayjs(repStartDate);
  const operationStartDate = convertToDayjs(
    operation.isEnded
      ? ((operation.acceptanceDate !== null
          ? operation.acceptanceDate
          : operation.realEndDate) as number[])
      : operation.startDate
  );
  const operationEndDate = convertToDayjs(
    operation.isEnded
      ? (operation.realEndDate as number[])
      : operation.plannedEndDate
  );

  if (
    operationStartDate.isBefore(reportStartDate) &&
    (operationEndDate.isAfter(reportStartDate) ||
      operationEndDate.isSame(reportStartDate))
  ) {
    return convertToString(repStartDate);
  }

  return convertToString(
    operation.isEnded
      ? ((operation.acceptanceDate !== null
          ? operation.acceptanceDate
          : operation.realEndDate) as number[])
      : operation.startDate
  );
}
