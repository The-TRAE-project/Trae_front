import dayjs from 'dayjs';

// import { convertToDate } from '../../../../helpers/convertToDate';
import { EmployeesReport } from '../../../../store/apis/reports/types';
import { getDatesBetween } from './getDatesBetween';

export const prepareForExcel = (reportsByEmployees: EmployeesReport) => {
  const dates = getDatesBetween(
    new Date(reportsByEmployees.startPeriod),
    new Date(reportsByEmployees.endPeriod)
  );

  const header = ['Сотрудник', ...dates, 'Итог Смена'];
  const excelSheets = [header];

  const employees = reportsByEmployees.shortEmployeeDtoList.map(
    (it) => `${it.firstName} ${it.lastName}`
  );
  const employeesWorkingShits = reportsByEmployees.workingShiftEmployeeDtoList;
  const employeesTotalShift = reportsByEmployees.employeeIdTotalPartsDtoList;
  // TODO:
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < employees.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const row: any = [];
    const workingShifts = [];
    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < dates.length; j++) {
      if (
        dayjs(dates[j]).toDate().getTime()
        // === convertToDate(employeesWorkingShits[j]?.shiftDate).getTime()
      ) {
        const workingShift = employeesWorkingShits[j]?.autoClosed
          ? `${employeesWorkingShits[j]?.partOfShift}(Авто Закрыто)`
          : employeesWorkingShits[j]?.partOfShift;
        workingShifts.push(workingShift);
      } else {
        workingShifts.push('');
      }
    }
    row.push(
      employees[i],
      ...workingShifts,
      employeesTotalShift[i].totalPartsOfShift
    );

    excelSheets.push(row);
  }

  return excelSheets;
};
