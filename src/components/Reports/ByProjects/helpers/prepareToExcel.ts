import dayjs from 'dayjs';
import { convertMonthToString } from '../../../../helpers/convertMonthToString';
import { convertToString } from '../../../../helpers/convertToString';
import { ProjectsReportTableData } from '../ReportTable';
import { calculateDeviation } from '../../helpers/calculateDeviation';
import { getDatesBetween } from '../../helpers/getDatesBetween';
import { getOperationStartDate } from './getOperationStartDate';
import { convertNumberToColumn } from '../../helpers/convertNumberToColumn';
import { getCeilLength } from './getCeilLength';
import { convertToDayjs } from '../../../../helpers/convertToDayjs';
import {
  ExcelAligmentStyle,
  ExcelBorderStyle,
  ExcelStylesForReports,
} from '../../../../helpers/hooks/useExportToExcel';
import { ProjectOperation } from '../../../../store/apis/reports/types';

function constructExcelHeader(dateStart: number[], dateEnd: number[]) {
  let currentDate = dayjs(convertToString(dateStart)).clone();
  const lastDate = dayjs(convertToString(dateEnd)).clone();

  const result: string[][] = [
    ['', '', '', '', '', convertMonthToString(currentDate.month())],
    ['№', 'Клиент', 'Изделие', 'Отклонение', 'Комментарий'],
  ];
  let prevMonth = currentDate.month();

  while (!currentDate.isAfter(lastDate, 'day')) {
    result[1].push(currentDate.date().toString());
    currentDate = currentDate.add(1, 'day');

    if (
      prevMonth !== currentDate.month() &&
      !currentDate.isAfter(lastDate, 'day')
    ) {
      result[0].push(convertMonthToString(currentDate.month()));
      prevMonth = currentDate.month();
    } else {
      result[0].push('');
    }
  }

  return result;
}

function constructExcelBody(data: ProjectsReportTableData) {
  const datesArray = getDatesBetween(data.dateStart, data.dateEnd);

  const result: (string | number | null)[][] = data.projects.map((project) => {
    const {
      name,
      number,
      comment,
      customer,
      realEndDate,
      endDateInContract,
      operations,
    } = project;

    const tableOperationsData: [string, string][] = datesArray.map((date) => {
      const isEndDateInContract = convertToString(endDateInContract) === date;

      return [date, isEndDateInContract ? '*' : ''];
    });

    operations.forEach((currentOperation) => {
      const startDate = getOperationStartDate(data.dateStart, currentOperation);

      const index = tableOperationsData.findIndex(
        (cell) => cell[0] === startDate
      );

      if (index >= 0) {
        const isEndDateInContract =
          convertToString(endDateInContract) === tableOperationsData[index][0];

        tableOperationsData[index][1] = `${isEndDateInContract ? '* ' : ''}${
          currentOperation.name
        }`;
      }
    });

    const row = [
      number,
      customer,
      name,
      calculateDeviation(endDateInContract, realEndDate),
      comment,
      ...tableOperationsData.map((operation) => operation[1]),
    ];

    return row;
  });

  return result;
}

function constructExcelStyles(data: ProjectsReportTableData) {
  const todayDate = dayjs().format('YYYY-MM-DD');
  const cellName = { column: 0, row: 1 };
  const datesArray = getDatesBetween(data.dateStart, data.dateEnd);
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

  // Months row
  for (let i = 1; i <= 5; i += 1) {
    const currentColumn = cellName.column;
    cellsStyles[`${convertNumberToColumn(currentColumn)}1`] = {
      border,
    };
    cellName.column += 1;
  }

  const lastDate = convertToDayjs(data.dateEnd);
  const firstDate = convertToDayjs(data.dateStart);

  datesArray.forEach((date) => {
    const currentDate = dayjs(date);
    const currentMonth = currentDate.month();
    const currentYear = currentDate.year();

    const length =
      currentMonth === lastDate.month() && currentYear === lastDate.year()
        ? lastDate.date() - currentDate.date() + 1
        : currentDate.daysInMonth() - currentDate.date() + 1;

    const currentColumn = cellName.column;
    cellsStyles[`${convertNumberToColumn(currentColumn)}1`] = {
      alignment,
      font: {
        name: 'Raleway',
        color: { argb: 'FFFFFFFF' },
        bold: true,
      },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF42894D' },
      },
      border: {
        top: { style: 'thin', color: { argb: 'FF42894D' } },
        left: { style: 'thin', color: { argb: 'FFFFFFFF' } },
        bottom: { style: 'thin', color: { argb: 'FF42894D' } },
        right: { style: 'thin', color: { argb: 'FFFFFFFF' } },
      },
      length:
        currentDate.isSame(firstDate) || currentDate.date() === 1
          ? length
          : undefined,
    };
    cellName.column += 1;
  });
  cellName.column = 0;
  cellName.row = 2;

  // Days row
  for (let i = 1; i <= 5; i += 1) {
    const currentColumn = cellName.column;
    cellsStyles[`${convertNumberToColumn(currentColumn)}2`] = {
      font: {
        name: 'Raleway',
      },
      alignment,
      border,
    };
    cellName.column += 1;
  }
  datesArray.forEach((date) => {
    const currentColumn = cellName.column;
    cellsStyles[`${convertNumberToColumn(currentColumn)}2`] = {
      alignment,
      font: {
        color: { argb: date === todayDate ? 'FF42894D' : 'FFFFFFFF' },
        name: 'Roboto',
        bold: true,
      },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
          argb: date === todayDate ? 'FFFFFFFF' : 'FFFF9A4A',
        },
      },
      border,
    };
    cellName.column += 1;
  });
  cellName.column = 0;
  cellName.row = 3;

  // Data rows
  data.projects.forEach((project) => {
    const { endDateInContract, operationPeriod, operations } = project;

    const isOverdueByProject = convertToDayjs(endDateInContract).isBefore(
      dayjs()
    );
    let isOverdueByOperations = false;
    const rowNumber = cellName.row;

    for (let i = 1; i <= 5; i += 1) {
      const currentColumn = cellName.column;
      cellsStyles[`${convertNumberToColumn(currentColumn)}${rowNumber}`] = {
        font: {
          name: 'Raleway',
        },
        alignment: {
          vertical: 'middle',
          horizontal: 'center',
          wrapText: true,
        },
        border,
      };
      cellName.column += 1;
    }

    datesArray.forEach((date) => {
      const currentOperation = operations.reduce(
        (result: undefined | ProjectOperation, op) => {
          const startDate = getOperationStartDate(data.dateStart, op);
          result = startDate === date ? op : result;
          return result;
        },
        undefined
      );

      cellsStyles[`${convertNumberToColumn(cellName.column)}${rowNumber}`] = {
        font: {
          name: 'Roboto',
          size: 20,
        },
        fill: {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '80909491' },
        },
        alignment,
        border,
      };

      if (currentOperation !== undefined) {
        const plannedEndDate = convertToString(currentOperation.plannedEndDate);

        const isOverdue =
          (currentOperation.isEnded &&
            plannedEndDate <
              convertToString(currentOperation.realEndDate as number[])) ||
          ((currentOperation.inWork || currentOperation.readyToAcceptance) &&
            plannedEndDate < todayDate);

        isOverdueByOperations = isOverdue ? true : isOverdueByOperations;

        const nextOperation = operations.find((op) => {
          return (
            op.priority >= currentOperation.priority &&
            convertToDayjs(op.startDate).isAfter(
              convertToDayjs(currentOperation.startDate)
            )
          );
        });
        const length =
          currentOperation.name === 'Отгрузка'
            ? 1
            : getCeilLength(
                data.dateStart,
                data.dateEnd,
                currentOperation,
                operationPeriod,
                nextOperation
              );
        let backgroundColor = '';
        let textColor = '';

        if (currentOperation.readyToAcceptance) {
          backgroundColor = 'FF42894D';
          textColor = 'FFFFFFFF';
        } else if (currentOperation.inWork) {
          backgroundColor = 'FFFF9A4A';
          textColor = 'FFFFFFFF';
        } else if (currentOperation.isEnded) {
          backgroundColor = 'FF83CC8C';
          textColor = 'FF000000';
        } else {
          backgroundColor = 'FFFFFFFF';
          textColor = 'FFFF9A4A';
        }

        cellsStyles[`${convertNumberToColumn(cellName.column)}${rowNumber}`] = {
          alignment,
          font: {
            name: 'Roboto',
            size: 14,
            color: { argb: textColor },
          },
          fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: backgroundColor },
          },
          border,
          length,
        };
      }

      cellName.column += 1;
    });

    cellsStyles[`A${rowNumber}`].fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: isOverdueByProject ? 'FFDA1212' : 'FFFFFFFF' },
    };
    cellsStyles[`A${rowNumber}`].font = {
      name: 'Raleway',
      color: {
        // eslint-disable-next-line no-nested-ternary
        argb: isOverdueByProject
          ? 'FFFFFFFF'
          : isOverdueByOperations
          ? 'FFDA1212'
          : '',
      },
    };

    cellName.row += 1;
    cellName.column = 0;
  });

  return cellsStyles;
}

export function prepareToExcel(data: ProjectsReportTableData) {
  const header = constructExcelHeader(data.dateStart, data.dateEnd);
  const body = constructExcelBody(data);
  const styles = constructExcelStyles(data);

  return { header, body, styles };
}
