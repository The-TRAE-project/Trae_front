import dayjs from 'dayjs';
import { ReportTableData } from '..';
import { constructTableData } from './constructTable';
import { convertMonthToString } from './convertMonthToString';

function constructTableHeader(dateStart: Date, dateEnd: Date) {
  let currentDate = dayjs(dateStart).clone();

  const result: string[][] = [
    ['', convertMonthToString(currentDate.month())],
    ['Сотрудники'],
  ];
  let prevMonth = currentDate.month();

  while (!currentDate.isAfter(dateEnd, 'day')) {
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

export function prepareToExcel(data: ReportTableData) {
  const header = constructTableHeader(data.timeStart, data.timeEnd);
  const body = constructTableData(data);

  return { header, body };
}
