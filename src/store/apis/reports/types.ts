import { z } from 'zod';

export interface ParamsForEmployees {
  startOfPeriod: string | Date;
  endOfPeriod: string | Date;
  employeeIds?: string;
}

export const EmployeeReportSchema = z.object({
  employeeIds: z
    .number()
    .array()
    .min(1, { message: 'Пожалуйста, выберите сотрудника' }),
  startOfPeriod: z.date({
    required_error: 'Пожалуйста, выберите дату начало',
    invalid_type_error: 'Пожалуйста, выберите дату начало',
  }),
  endOfPeriod: z.date({
    required_error: 'Пожалуйста, выберите дату окончания',
    invalid_type_error: 'Пожалуйста, выберите дату окончания',
  }),
});

export type EmployeeReportFormValues = z.infer<typeof EmployeeReportSchema>;

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
