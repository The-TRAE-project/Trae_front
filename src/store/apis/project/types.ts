import { z } from 'zod';

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
    .string()
    .regex(RegEx.name, {
      message: 'Имя клиента должно быть не больше 30 символов',
    })
    .min(3, { message: 'Имя клиента должно быть не меньше 3 символов' })
    .max(30, { message: 'Имя клиента должно быть не больше 30 символов' }),
  name: z
    .string()
    .regex(RegEx.name, {
      message: 'Имя проекта должо быть не больше 30 символов',
    })
    .min(3, { message: 'Имя проекта должно быть не меньше 3 символов' })
    .max(30, { message: 'Имя проекта должно быть не больше 30 символов' }),
  number: z
    .number()
    .min(3, { message: 'Номер проекта должен быть не меньше 3 символов' }),
  comment: z
    .string()
    .max(1000, { message: 'Комментарий должен быть не больше 1000 символов' })
    .nullable(),
  operations: OperationSchema.array().min(1, {
    message: 'Пожалуйста, выберите тип работ',
  }),
  plannedEndDate: z.date({
    required_error: 'Пожалуйста, выберите дату',
    invalid_type_error: 'Не правильный формат даты',
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

export interface TypeWork {
  id: number;
  name: string;
  isActive: boolean;
}

export interface ShortProjectInfo {
  id: number;
  number: number;
  name: string;
}

export interface ShortEmployeeInfo {
  id: number;
  firstName: string;
  lastName: string;
  onShift: boolean;
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
  typeWorkDto: TypeWork;
  shortProjectDto: ShortProjectInfo;
  shortEmployeeDto: ShortEmployeeInfo | null;
  startDate: Date | null;
  acceptanceDate: Date | null;
  plannedEndDate: Date | null;
  realEndDate: Date | null;
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
  plannedEndDate: Date;
  realEndDate: Date | null;
  startDate: Date;
  managerDto: Constructor;
  operations: ProjectOperation[];
}
