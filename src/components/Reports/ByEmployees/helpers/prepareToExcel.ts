import dayjs from 'dayjs';
import { convertMonthToString } from '../../../../helpers/convertMonthToString';
import { convertToString } from '../../../../helpers/convertToString';
import { EmployeesReportTableData } from '../ReportTable';
import { getDatesBetween } from '../../helpers/getDatesBetween';
import { convertNumberToColumn } from '../../helpers/convertNumberToColumn';
import {
  ExcelAligmentStyle,
  ExcelBorderStyle,
  ExcelStylesForReports,
} from '../../../../helpers/hooks/useExportToExcel';
import { convertToDayjs } from '../../../../helpers/convertToDayjs';

function constructExcelHeader(dateStart: number[], dateEnd: number[]) {
  let currentDate = dayjs(convertToString(dateStart)).clone();
  const lastDate = dayjs(convertToString(dateEnd)).clone();

  const result: string[][] = [
    ['', convertMonthToString(currentDate.month())],
    ['Сотрудники'],
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

  result[0].push('');
  result[1].push('Итого смен');

  return result;
}

function constructExcelBody(data: EmployeesReportTableData) {
  const datesArray = getDatesBetween(data.dateStart, data.dateEnd);

  return data.employees.map((employee) => {
    return [
      `${employee.firstName} ${employee.lastName}`,
      // eslint-disable-next-line array-callback-return
      ...datesArray.map((date) => {
        const currentShift = data.employeeWorkingShifts.find(
          (shift) =>
            shift.employeeId === employee.id &&
            convertToString(shift.shiftDate) === date
        );
        return currentShift?.partOfShift || null;
      }),
      data.employeeTotalShifts.find((shifts) => shifts.id === employee.id)
        ?.totalPartsOfShift || 0,
    ];
  });
}

function constructExcelStyles(data: EmployeesReportTableData) {
  const cellName = { column: 1, row: 1 };
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
  cellsStyles.A1 = {
    border,
  };

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
  cellsStyles[`${convertNumberToColumn(cellName.column)}1`] = {
    border,
  };
  cellName.column = 1;
  cellName.row = 2;

  // Days row
  cellsStyles.A2 = {
    font: {
      name: 'Raleway',
    },
    alignment,
    border,
  };
  datesArray.forEach(() => {
    const currentColumn = cellName.column;
    cellsStyles[`${convertNumberToColumn(currentColumn)}2`] = {
      alignment,
      font: {
        color: { argb: 'FFFFFFFF' },
        name: 'Roboto',
        bold: true,
      },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFF9A4A' },
      },
      border,
    };

    cellName.column += 1;
  });
  cellsStyles[`${convertNumberToColumn(cellName.column)}2`] = {
    font: {
      name: 'Raleway',
    },
    alignment,
    border,
  };
  cellName.column = 1;
  cellName.row = 3;

  // Data rows
  data.employees.forEach((employee) => {
    const rowNumber = cellName.row;

    cellsStyles[`A${rowNumber}`] = {
      font: {
        name: 'Raleway',
      },
      alignment,
      border,
    };

    datesArray.forEach((date) => {
      const currentShift = data.employeeWorkingShifts.find(
        (shift) =>
          shift.employeeId === employee.id &&
          convertToString(shift.shiftDate) === date
      );
      cellsStyles[`${convertNumberToColumn(cellName.column)}${rowNumber}`] = {
        alignment,
        font: {
          color: currentShift?.autoClosed ? { argb: 'FFFFFFFF' } : undefined,
          name: 'Roboto',
          size: 14,
        },
        fill: currentShift?.autoClosed
          ? {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFDA1212' },
            }
          : undefined,
        border,
      };

      cellName.column += 1;
    });

    cellsStyles[`${convertNumberToColumn(cellName.column)}${rowNumber}`] = {
      font: {
        name: 'Roboto',
        size: 14,
      },
      alignment,
      border,
    };

    cellName.row += 1;
    cellName.column = 1;
  });

  return cellsStyles;
}

export function prepareToExcel(data: EmployeesReportTableData) {
  const header = constructExcelHeader(data.dateStart, data.dateEnd);
  const body = constructExcelBody(data);
  const styles = constructExcelStyles(data);

  return { header, body, styles };
}
