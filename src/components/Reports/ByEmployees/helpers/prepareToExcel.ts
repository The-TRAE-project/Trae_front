import dayjs from 'dayjs';
import { convertMonthToString } from '../../../../helpers/convertMonthToString';
import { convertToString } from '../../../../helpers/convertToString';
import { EmployeesReportTableData } from '../ReportTable';
import { getDatesBetween } from '../../helpers/getDatesBetween';

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

    if (prevMonth !== currentDate.month()) {
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
  const result: (string | number | null)[][] = data.employees.map(
    (employee) => {
      return [
        `${employee.firstName} ${employee.lastName}`,
        // eslint-disable-next-line array-callback-return
        ...getDatesBetween(data.dateStart, data.dateEnd).map((date) => {
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
    }
  );

  return result;
}

function constructExcelStyles(data: EmployeesReportTableData) {
  const result: (string | number | null)[][] = [];

  return result;
}

export function prepareToExcel(data: EmployeesReportTableData) {
  const header = constructExcelHeader(data.dateStart, data.dateEnd);
  const body = constructExcelBody(data);
  const styles = constructExcelStyles(data);

  return { header, body, styles };
}
