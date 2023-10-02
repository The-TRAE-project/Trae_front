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
      required_error: 'Пожалуйста, выберите дату начала',
      invalid_type_error: 'Пожалуйста, выберите дату начала',
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
      required_error: 'Пожалуйста, выберите дату начала',
      invalid_type_error: 'Пожалуйста, выберите дату начала',
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
      path: ['endOfPeriod'],
    }
  )
  .refine(
    (schema) =>
      dayjs(schema.startOfPeriod).diff(dayjs(schema.endOfPeriod), 'd') >= -365,
    {
      message: 'Пожалуйста выберите промежуток меньше года',
      path: ['endOfPeriod'],
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

export const DeadlineReportSchema = z
  .object({
    startOfPeriod: z
      .date({
        required_error: 'Пожалуйста, выберите дату начала',
        invalid_type_error: 'Пожалуйста, выберите дату начала',
      })
      .optional(),
    endOfPeriod: z
      .date({
        required_error: 'Пожалуйста, выберите дату окончания',
        invalid_type_error: 'Пожалуйста, выберите дату окончания',
      })
      .optional(),
    isDatesActive: z.boolean(),
    firstParameter: z
      .object({
        id: z.string(),
        value: z.string(),
      })
      .array()
      .nonempty(),
    secondParameter: z
      .object({
        id: z.string(),
        value: z.string(),
      })
      .array()
      .nonempty(),
    thirdParameter: z
      .object({
        id: z.string(),
        value: z.string(),
      })
      .array()
      .nonempty(),
    valueOfFirstParameter: z
      .object({
        id: z.number(),
        value: z.union([z.string(), z.number()]),
      })
      .array()
      .nonempty('Выберите хотя бы одно значение критерия'),
    valuesOfSecondParameter: z
      .object({
        id: z.number(),
        value: z.union([z.string(), z.number()]),
      })
      .array()
      .nonempty('Выберите хотя бы одно значение критерия'),
    valuesOfThirdParameter: z
      .object({
        id: z.number(),
        value: z.union([z.string(), z.number()]),
      })
      .array()
      .nonempty('Выберите хотя бы одно значение критерия'),
  })
  .refine(
    (schema) =>
      schema.startOfPeriod === undefined ||
      schema.endOfPeriod === undefined ||
      dayjs(schema.startOfPeriod).diff(dayjs(schema.endOfPeriod), 'd') <= -5,
    {
      message: 'Пожалуйста выберите промежуток больше недели',
      path: ['endOfPeriod'],
    }
  )
  .refine(
    (schema) =>
      schema.startOfPeriod === undefined ||
      schema.endOfPeriod === undefined ||
      dayjs(schema.startOfPeriod).diff(dayjs(schema.endOfPeriod), 'd') >= -365,
    {
      message: 'Пожалуйста выберите промежуток меньше года',
      path: ['endOfPeriod'],
    }
  )
  .refine(
    (schema) =>
      schema.isDatesActive === false ||
      (schema.isDatesActive && schema.startOfPeriod !== undefined),
    {
      message: 'Пожалуйста, выберите дату начала',
      path: ['startOfPeriod'],
    }
  )
  .refine(
    (schema) =>
      schema.isDatesActive === false ||
      (schema.isDatesActive && schema.endOfPeriod !== undefined),
    {
      message: 'Пожалуйста, выберите дату окончания',
      path: ['endOfPeriod'],
    }
  );

type ParameterValue = {
  id: number;
  value: number | string;
};

type ParameterData = {
  id: string;
  value: string;
};

export type DeadlinesReportFormValues = {
  startOfPeriod?: Date | undefined;
  endOfPeriod?: Date | undefined;
  isDatesActive?: boolean | undefined;
  firstParameter: ParameterData[];
  secondParameter: ParameterData[];
  thirdParameter: ParameterData[];
  valueOfFirstParameter: ParameterValue[];
  valuesOfSecondParameter: ParameterValue[];
  valuesOfThirdParameter: ParameterValue[];
};

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
