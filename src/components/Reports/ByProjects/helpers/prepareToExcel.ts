import dayjs from 'dayjs';
import { convertMonthToString } from '../../../../helpers/convertMonthToString';
import { convertToString } from '../../../../helpers/convertToString';
import { ProjectsReportTableData } from '../ReportTable';
import { calculateDeviation } from '../../helpers/calculateDeviation';
import { getDatesBetween } from '../../helpers/getDatesBetween';
import { getOperationStartDate } from './getOperationStartDate';

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

    if (prevMonth !== currentDate.month()) {
      result[0].push(convertMonthToString(currentDate.month()));
      prevMonth = currentDate.month();
    } else {
      result[0].push('');
    }
  }

  return result;
}

function constructExcelBody(data: ProjectsReportTableData) {
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

    let row = [
      number,
      customer,
      name,
      calculateDeviation(endDateInContract, realEndDate),
      comment,
    ];

    const tableOperationsData: [string, string][] = getDatesBetween(
      data.dateStart,
      data.dateEnd
    ).map((date) => {
      const isEndDateInContract = convertToString(endDateInContract) === date;

      return [date, isEndDateInContract ? 'Контракт' : ''];
    });

    operations.forEach((currentOperation) => {
      const startDate = getOperationStartDate(data.dateStart, currentOperation);

      const index = tableOperationsData.findIndex(
        (cell) => cell[0] === startDate
      );

      if (index >= 0) {
        const isEndDateInContract =
          convertToString(endDateInContract) === tableOperationsData[index][0];

        tableOperationsData[index][1] = `${
          isEndDateInContract ? 'Контракт ' : ''
        }${currentOperation.name}`;
      }
    });

    row = [...row, ...tableOperationsData.map((operation) => operation[1])];

    return row;
  });

  return result;
}

function constructExcelStyles(data: ProjectsReportTableData) {
  const result: (string | number | null)[][] = [];

  return result;
}

export function prepareToExcel(data: ProjectsReportTableData) {
  const header = constructExcelHeader(data.dateStart, data.dateEnd);
  const body = constructExcelBody(data);
  const styles = constructExcelStyles(data);

  return { header, body, styles };
}
