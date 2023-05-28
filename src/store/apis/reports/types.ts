export interface ParamsForEmployees {
  startOfPeriod: string | Date;
  endOfPeriod: string | Date;
  employeeIds?: string;
}

export interface ShortEmployeeInfo {
  id: number;
  firstName: string;
  lastName: string;
}

export interface ShortWorkingShiftInfo {
  employeeId: number;
  autoClosed: boolean;
  partOfShift: number;
  shiftDate: number[];
}

export interface EmployeeTotalInfo {
  id: number;
  totalPartsOfShift: number;
}

export interface EmployeesReports {
  startPeriod: number[];
  endPeriod: number[];
  shortEmployeeDtoList: ShortEmployeeInfo[];
  workingShiftEmployeeDtoList: ShortWorkingShiftInfo[];
  employeeIdTotalPartsDtoList: EmployeeTotalInfo[];
}
