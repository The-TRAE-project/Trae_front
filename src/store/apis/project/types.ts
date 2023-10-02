import { z } from 'zod';

import dayjs from 'dayjs';
import { RegEx } from '../../../constants/regex';
import { Roles } from '../../slices/auth/types';

export const OperationSchema = z.object({
  name: z.string(),
  typeWorkId: z.number(),
});

export const OperationCreateSchema = z.object({
  name: z
    .string()
    .regex(RegEx.cyrillic, {
      message: 'Название этапа должно содержать только кириллицу',
    })
    .min(3, { message: 'Название этапа должно быть не меньше 3 символов' })
    .max(30, { message: 'Название этапа должно быть не больше 30 символов' }),
  typeWorkId: z.string().min(1, {
    message: 'Пожалуйста, выберите тип работ',
  }),
});

export type Operation = z.infer<typeof OperationSchema>;
export type CreateOperationFormValues = z.infer<typeof OperationCreateSchema>;

export const CreateProjectSchema = z.object({
  customer: z
    .string({
      required_error: 'Пожалуйста, заполните поле наименование клиента!',
      invalid_type_error: 'Не правильный формат наименование клиента!',
    })
    .regex(RegEx.name, {
      message: 'Имя клиента должно быть не больше 30 символов',
    })
    .min(3, { message: 'Имя клиента должно быть не меньше 3 символов' })
    .max(30, { message: 'Имя клиента должно быть не больше 30 символов' }),
  name: z
    .string({
      required_error: 'Пожалуйста, заполните поле наименование изделия!',
      invalid_type_error: 'Не правильный формат наименование изделия!',
    })
    .regex(RegEx.name, {
      message: 'Имя проекта должо быть не больше 30 символов',
    })
    .min(3, { message: 'Имя проекта должно быть не меньше 3 символов' })
    .max(30, { message: 'Имя проекта должно быть не больше 30 символов' }),
  number: z
    .number({
      required_error: 'Пожалуйста, заполните поле номер проекта!',
      invalid_type_error: 'Не правильный формат номера проекта!',
    })
    .min(1, { message: 'Номер проекта должен быть не меньше 1 символа' }),
  comment: z
    .string()
    .max(1000, { message: 'Комментарий должен быть не больше 1000 символов' })
    .nullable()
    .optional(),
  operations: OperationSchema.array().min(1, {
    message: 'Пожалуйста, выберите тип работ',
  }),
  plannedEndDate: z
    .date({
      required_error: 'Пожалуйста, выберите дату',
      invalid_type_error: 'Не правильный формат даты',
    })
    .refine((plannedEndDate) => dayjs(plannedEndDate).diff(dayjs()) >= 0, {
      message: 'Пожалуйста выберите дату в будущем',
    }),
});

export type CreateProjectFormValues = z.infer<typeof CreateProjectSchema>;

export interface Constructor {
  id: number;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  role: Roles;
  status: boolean;
  dateOfEmployment: Date;
  dateOfDismissal: Date | null;
}

export interface EmployeeShortInfo {
  firstName: string;
  lastName: string;
}

export interface ProjectOperation {
  id: number;
  priority: number;
  name: string;
  period: number;
  actualPeriod: number | null;
  isEnded: boolean;
  inWork: boolean;
  readyToAcceptance: boolean;
  typeWorkName: string;
  projectNumber: number;
  employeeFirstLastNameDto: EmployeeShortInfo | null;
  startDate: Date | number[] | null;
  acceptanceDate: Date | number[] | null;
  plannedEndDate: Date | number[] | null;
  realEndDate: Date | number[] | null;
}

export interface Project {
  id: number;
  number: number;
  name: string;
  comment: string;
  customer: string;
  isEnded: boolean;
  period: number;
  actualPeriod: number | null;
  startFirstOperationDate: Date | number[] | null;
  endDateInContract: Date | number[];
  startDate: Date | number[];
  plannedEndDate: Date | number[];
  realEndDate: Date | number[] | null;
  managerDto: Constructor;
  operations: ProjectOperation[];
}

export interface OperationShortInfo {
  name: string;
  isEnded: boolean;
  inWork: boolean;
  readyToAcceptance: boolean;
}

export interface ProjectShortInfo {
  id: number;
  number: number;
  name: string;
  customer: string;
  isOverdueByContractDate: boolean;
  isOverdueByCurrentOperation: boolean;
  isEnded: boolean;
  operation: OperationShortInfo;
}

export interface FilterValues {
  elementPerPage?: string;
  page?: string;
  isEnded?: string;
  isOnlyFirstOpReadyToAcceptance?: string;
  isOnlyLastOpReadyToAcceptance?: string;
  isCurrentOpInWorkOrReadyToAcceptance?: string;
  isOverdueProject?: string;
  isOverdueCurrentOpInProject?: string;
}

export interface SearchValues {
  elementPerPage?: string;
  page?: string;
  projectNumberOrCustomer: string;
}

export const UpdateProjectSchema = z.object({
  projectId: z.number().min(3, { message: 'Укажите id проекта!' }),
  customer: z
    .string()
    .regex(RegEx.name, {
      message: 'Имя клиента должно быть не больше 30 символов',
    })
    .min(3, { message: 'Имя клиента должно быть не меньше 3 символов' })
    .max(30, { message: 'Имя клиента должно быть не больше 30 символов' })
    .nullable(),
  projectName: z
    .string()
    .regex(RegEx.name, {
      message: 'Имя проекта должо быть не больше 30 символов',
    })
    .min(3, { message: 'Имя проекта должно быть не меньше 3 символов' })
    .max(30, { message: 'Имя проекта должно быть не больше 30 символов' })
    .nullable(),
  projectNumber: z
    .number({
      required_error: 'Пожалуйста, заполните поле номер проекта!',
      invalid_type_error: 'Не правильный формат номера проекта!',
    })
    .min(1, { message: 'Номер проекта должен быть не меньше 1 символа' })
    .nullable(),
  commentary: z
    .string()
    .max(1000, { message: 'Комментарий должен быть не больше 1000 символов' })
    .nullable(),
});

export type UpdateProjectFormValues = z.infer<typeof UpdateProjectSchema>;

export interface ReturnUpdatedEndDateValues {
  projectId: string;
  updatedPlannedAndContractEndDate: Date | number[];
}

export const UpdateEndDateSchema = z
  .object({
    projectId: z.number().min(3, { message: 'Укажите id проекта!' }).optional(),
    newPlannedAndContractEndDate: z
      .date({
        required_error: 'Пожалуйста, выберите дату',
        invalid_type_error: 'Не правильный формат даты',
      })
      .nullable(),
    currentContractEndDate: z.date().nullable().optional(),
  })
  .refine(
    (schema) =>
      dayjs(schema.newPlannedAndContractEndDate).isAfter(
        dayjs(schema.currentContractEndDate)
      ),
    {
      message: 'Пожалуйста, выберите новую дату позже текущей даты в контракте',
      path: ['newPlannedAndContractEndDate'],
    }
  );

export type UpdateEndDateFormValues = z.infer<typeof UpdateEndDateSchema>;

export const ProjectDeleteSchema = z.object({
  projectNumber: z
    .number({
      required_error: 'Пожалуйста, заполните поле номер проекта!',
      invalid_type_error: 'Не правильный формат номера проекта!',
    })
    .min(1, { message: 'Номер проекта должен быть не меньше 1 символа' }),
});

export type ProjectDeleteFormValues = z.infer<typeof ProjectDeleteSchema>;

export const NewOperationSchema = z.object({
  projectId: z.number().min(1, {
    message: 'Поле id проекта не должно быть пустым!',
  }),
  priority: z
    .number({
      required_error: 'Поле приоритет не должно быть пустым!',
      invalid_type_error: 'Не правильный формат приоритета!',
    })
    .min(1, {
      message: 'Пожалуйста, заполните поле приоритет!',
    }),
  name: z
    .string()
    .regex(RegEx.cyrillic, {
      message: 'Название этапа должно содержать только кириллицу',
    })
    .min(3, { message: 'Пожалуйста, выберите этап!' }),
  typeWorkId: z.number().min(1, {
    message: 'Пожалуйста, выберите тип работ',
  }),
});

export type NewOperationFormValues = z.infer<typeof NewOperationSchema>;

// Terminal Workshop
export interface StageInWork {
  customerLastName: string;
  operationId: number;
  operationName: string;
  projectId: number;
  projectName: string;
  projectNumber: number;
}

export interface ReceiveProjectStageValue {
  employeeId: number;
  operationId: number;
  operationPriority: number;
}

export interface CloseProjectStageValue {
  employeeId: number;
  operationId: number;
}

export interface ProjectBriefInfo {
  id: number;
  projectName: string;
  number: number;
  customer: string;
  availableOperationName: string;
}

export interface ProjectStage {
  id: number;
  name: string;
  readyToAcceptance: boolean;
  priority: number;
  isEnded: boolean;
  inWork: boolean;
  employeeFirstName: null | string;
  employeeLastName: null | string;
}

export interface ProjectsShortInfo {
  projectId: number;
  number: number;
}

export interface ProjectsShortInfoParams {
  employeeIds: string;
  operationIds: string;
  startOfPeriod: string;
  endOfPeriod: string;
}

export interface OperationsShortInfo {
  name: string;
  operationId: number;
  projectNumber: number;
}

export interface OperationsShortInfoParams {
  employeeIds: string;
  projectIds: string;
  startOfPeriod: string;
  endOfPeriod: string;
}
