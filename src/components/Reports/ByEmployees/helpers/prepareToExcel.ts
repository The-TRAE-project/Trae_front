import dayjs from 'dayjs';
import { ReportTableData } from '..';
import { convertMonthToString } from '../../../../helpers/convertMonthToString';
import { convertToString } from '../../../../helpers/convertToString';

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

    if (prevMonth !== currentDate.month()) {
      result[0].push(convertMonthToString(currentDate.month()));
      prevMonth = currentDate.month();
    }
    currentDate = currentDate.add(1, 'day');
  }

  result[0].push('');
  result[1].push('Итого смен');

  return result;
}

// TODO: data preparation for excel import
function constructExcelBody(data: ReportTableData) {
  const result: string[][] = [
    [data.employeeTotalShifts[0].totalPartsOfShift.toString()],
  ];

  return result;
}

export function prepareToExcel(data: ReportTableData) {
  const header = constructExcelHeader(data.dateStart, data.dateEnd);
  const body = constructExcelBody(data);

  return { header, body };
}
