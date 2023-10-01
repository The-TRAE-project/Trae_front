import { convertToString } from '../../../../helpers/convertToString';
import {
  ExcelAligmentStyle,
  ExcelBorderStyle,
  ExcelStylesForReports,
} from '../../../../helpers/hooks/useExportToExcel';
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
  const cellName = { column: 1, row: 1 };
  const columnArray = ['A', 'B', 'C', 'D', 'E', 'F'];
  const cellsStyles: { [key: string]: ExcelStylesForReports } = {};

  const border: ExcelBorderStyle = {
    top: { style: 'thin', color: { argb: 'FF42894D' } },
    left: { style: 'thin', color: { argb: 'FF42894D' } },
    bottom: { style: 'thin', color: { argb: 'FF42894D' } },
    right: { style: 'thin', color: { argb: 'FF42894D' } },
  };
  const alignment: ExcelAligmentStyle = {
    vertical: 'middle',
    horizontal: 'center',
  };

  // Header row
  columnArray.forEach((currentColumn) => {
    cellsStyles[`${currentColumn}1`] = {
      alignment,
      font: {
        name: 'Raleway',
        size: 13,
      },
      border,
    };
  });
  cellName.column = 1;
  cellName.row = 2;

  // Data rows
  data.secondRespValues.forEach((secondRespValue) => {
    return secondRespValue.thirdRespValues.forEach(() => {
      const currentRow = cellName.row;
      columnArray.forEach((currentColumn) => {
        cellsStyles[`${currentColumn}${currentRow}`] = {
          alignment,
          font: {
            name: 'Raleway',
          },
          border,
        };
      });
      cellName.row += 1;
    });
  });

  return cellsStyles;
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
