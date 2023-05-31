import dayjs from 'dayjs';

import { convertToDate } from '../../../../helpers/convertToDate';
import { EmployeesReports } from '../../../../store/apis/reports/types';

export const prepareForExcel = (reportsByEmployees: EmployeesReports) => {
  const workingShifts = reportsByEmployees.workingShiftEmployeeDtoList.map(
    (workShift) => {
      const employee = reportsByEmployees.shortEmployeeDtoList.find(
        (it) => workShift.employeeId === it.id
      );
      const totalShift = reportsByEmployees.employeeIdTotalPartsDtoList.find(
        (it) => workShift.employeeId === it.id
      );
      // TODO:
      const keyDate = dayjs(convertToDate(workShift.shiftDate)).format(
        'DD.MM.YYYY'
      );
      const keyEmployee = 'Сотрудник';
      const keyTotalShift = 'Итог Смена';
      // TODO:
      return {
        [keyEmployee]: `${employee?.firstName} ${employee?.lastName}`,
        [keyDate]: workShift.autoClosed
          ? `${workShift.partOfShift}(Авто Закрыто)`
          : workShift.partOfShift,
        [keyTotalShift]: totalShift?.totalPartsOfShift,
      };
    }
  );

  return workingShifts;
};
