import { convertToString } from '../../../../helpers/convertToString';
import { DeadlinesReport } from '../../../../store/apis/reports/types';
import { calculateDeviation } from '../../helpers/calculateDeviation';

interface PrepareToExcelProps {
  reportsByDeadlines: DeadlinesReport;
  firstParameter: string;
  secondParameter: string;
  thirdParameter: string;
}
function constructExcelHeader(
  firstParameter: string,
  secondParameter: string,
  thirdParameter: string
) {
  const result: string[][] = [
    [
      firstParameter,
      secondParameter,
      thirdParameter,
      'Дата окончания план',
      'Дата окончания факт',
      'Отклонение',
    ],
  ];

  return result;
}

function constructExcelBody(data: DeadlinesReport) {
  const result: (string | number | null)[][] = data.secondRespValues
    .map((secondRespValue) => {
      return secondRespValue.thirdRespValues.map((thirdRespValue) => {
        return [
          data.firstRespValue,
          secondRespValue.secondRespValue,
          thirdRespValue.thirdRespValue,
          thirdRespValue.plannedEndDate
            ? convertToString(thirdRespValue.plannedEndDate)
            : '',
          thirdRespValue.realEndDate
            ? convertToString(thirdRespValue.realEndDate)
            : '',
          calculateDeviation(
            thirdRespValue.plannedEndDate,
            thirdRespValue.realEndDate
          ),
        ];
      });
    })
    .flat();
  return result;
}

function constructExcelStyles(data: DeadlinesReport) {
  const result: (string | number | null)[][] = [];

  return result;
}

export function prepareToExcel({
  reportsByDeadlines,
  firstParameter,
  secondParameter,
  thirdParameter,
}: PrepareToExcelProps) {
  const header = constructExcelHeader(
    firstParameter,
    secondParameter,
    thirdParameter
  );
  const body = constructExcelBody(reportsByDeadlines);
  const styles = constructExcelStyles(reportsByDeadlines);

  return { header, body, styles };
}
