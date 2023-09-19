import dayjs from 'dayjs';
import { z } from 'zod';

export interface ParamsForEmployeesReports {
  startOfPeriod: string | Date;
  endOfPeriod: string | Date;
  employeeIds?: string;
}

export const EmployeeReportSchema = z
  .object({
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
  })
  .refine(
    (schema) =>
      dayjs(schema.startOfPeriod).diff(dayjs(schema.endOfPeriod), 'd') <= -5,
    {
      message: 'Пожалуйста выберите промежуток больше недели',
    }
  )
  .refine(
    (schema) =>
      dayjs(schema.startOfPeriod).diff(dayjs(schema.endOfPeriod), 'd') >= -365,
    {
      message: 'Пожалуйста выберите промежуток меньше года',
    }
  );

export type EmployeeReportFormValues = z.infer<typeof EmployeeReportSchema>;

export interface ShortEmployeeInfo {
  id: number;
  firstName: string;
  lastName: string;
}

export interface EmployeeWorkingShiftInfo {
  employeeId: number;
  autoClosed: boolean;
  partOfShift: number;
  shiftDate: number[];
}

export interface EmployeeTotalShiftInfo {
  id: number;
  totalPartsOfShift: number;
}

export interface EmployeesReport {
  startPeriod: number[];
  endPeriod: number[];
  shortEmployeeDtoList: ShortEmployeeInfo[];
  workingShiftEmployeeDtoList: EmployeeWorkingShiftInfo[];
  employeeIdTotalPartsDtoList: EmployeeTotalShiftInfo[];
}

export interface ParamsForProjectsReports {
  startOfPeriod: string | Date;
  endOfPeriod: string | Date;
}

export const ProjectReportSchema = z
  .object({
    startOfPeriod: z.date({
      required_error: 'Пожалуйста, выберите дату начало',
      invalid_type_error: 'Пожалуйста, выберите дату начало',
    }),
    endOfPeriod: z.date({
      required_error: 'Пожалуйста, выберите дату окончания',
      invalid_type_error: 'Пожалуйста, выберите дату окончания',
    }),
  })
  .refine(
    (schema) =>
      dayjs(schema.startOfPeriod).diff(dayjs(schema.endOfPeriod), 'd') <= -5,
    {
      message: 'Пожалуйста выберите промежуток больше недели',
    }
  )
  .refine(
    (schema) =>
      dayjs(schema.startOfPeriod).diff(dayjs(schema.endOfPeriod), 'd') >= -365,
    {
      message: 'Пожалуйста выберите промежуток меньше года',
    }
  );

export type ProjectReportFormValues = z.infer<typeof ProjectReportSchema>;

export interface ProjectOperation {
  id: number;
  inWork: boolean;
  isEnded: boolean;
  name: string;
  priority: number;
  readyToAcceptance: boolean;
  plannedEndDate: number[];
  acceptanceDate: number[] | null;
  realEndDate: number[] | null;
  startDate: number[];
}

export interface ProjectInfo {
  id: number;
  number: number;
  customer: string;
  name: string;
  operationPeriod: number;
  isEnded: boolean;
  comment: string;
  operations: ProjectOperation[];
  endDateInContract: number[];
  plannedEndDate: number[];
  realEndDate: number[] | null;
  startDate: number[];
  startFirstOperationDate: number[] | null;
}

export interface ProjectsReport {
  startPeriod: number[];
  endPeriod: number[];
  dateOfReportFormation: number[];
  projectsForReportDtoList: ProjectInfo[];
}

export interface DashboardReport {
  countEmpsOnActiveWorkingShift: number;
  countNotEndedProjects: number;
  countOverdueProjects: number;
  countProjectsWithLastOpReadyToAcceptance: number;
  countProjectsWithOverdueCurrentOperation: number;
}

export const DeadlineReportSchema = z.object({
  startOfPeriod: z.date().optional(),
  endOfPeriod: z.date().optional(),
  isDatesActive: z.boolean(),
  firstParameter: z
    .object({
      id: z.string(),
      value: z.string(),
    })
    .array(),
  secondParameter: z
    .object({
      id: z.string(),
      value: z.string(),
    })
    .array(),
  thirdParameter: z
    .object({
      id: z.string(),
      value: z.string(),
    })
    .array(),
  valueOfFirstParameter: z
    .object({
      id: z.number(),
      value: z.union([z.string(), z.number()]),
    })
    .array(),
  valuesOfSecondParameter: z
    .object({
      id: z.number(),
      value: z.union([z.string(), z.number()]),
    })
    .array(),
  valuesOfThirdParameter: z
    .object({
      id: z.number(),
      value: z.union([z.string(), z.number()]),
    })
    .array(),
});

export type DeadlinesReportFormValues = z.infer<typeof DeadlineReportSchema>;

export interface ParameterData {
  id: number | string;
  value: number | string;
}

export interface ParamsForDeadlinesReports {
  firstParameter: string;
  secondParameter: string;
  thirdParameter: string;
  valueOfFirstParameter: number;
  valuesOfSecondParameter: number[];
  valuesOfThirdParameter: number[];
}

export interface DeadlinesReport {
  firstRespId: number;
  firstRespValue: string;
  secondRespValues: {
    secondRespId: number;
    secondRespValue: string;
    thirdRespValues: {
      plannedEndDate: number[];
      realEndDate: number[];
      thirdRespId: number;
      thirdRespValue: string;
    }[];
  }[];
}
