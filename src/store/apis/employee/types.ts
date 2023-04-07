import { z } from 'zod';
import { RegEx } from '../../../constants/regex';
import { WorkType } from '../workTypes/types';

export interface Project {
  id: number;
  projectName: string;
  number: number;
  customer: string;
  availableOperationName: string;
}

export interface StageInWork {
  customerLastName: string;
  operationId: number;
  operationName: string;
  projectId: number;
  projectName: string;
  projectNumber: number;
}

export interface ProjectStage {
  id: number;
  name: string;
  readyToAcceptance: boolean;
  isEnded: boolean;
  inWork: boolean;
  employeeFirstName: null | string;
  employeeLastName: null | string;
}

export interface ReceiveProjectStageValue {
  employeeId: number;
  operationId: number;
}

export const EmployeeFormSchema = z.object({
  lastName: z
    .string()
    .regex(RegEx.fullName, {
      message:
        'Фамилия должно содержать только кириллицу, должно начинаться с заглавной буквы',
    })
    .min(3, { message: 'Фамилия должен быть не меньше 2 символов' })
    .max(15, { message: 'Фамилия должен быть не больше 15 символов' }),
  firstName: z
    .string()
    .regex(RegEx.fullName, {
      message:
        'Имя должно содержать только кириллицу, должно начинаться с заглавной буквы',
    })
    .min(3, { message: 'Имя должен быть не меньше 2 символов' })
    .max(15, { message: 'Имя должен быть не больше 15 символов' }),
  middleName: z
    .string()
    .regex(RegEx.fullName, {
      message:
        'Отчество должно содержать только кириллицу, должно начинаться с заглавной буквы',
    })
    .nullable(),
  phone: z
    .string()
    .min(17, {
      message: 'Пожалуйста, введите правильный формат телефон номера!',
    })
    .max(17, {
      message: 'Пожалуйста, введите правильный формат телефон номера!',
    }),
  dateOfEmployment: z.date({
    required_error: 'Пожалуйста, выберите дату',
    invalid_type_error: 'Не правильный формат даты!',
  }),
  typesId: z.any().array().min(1, {
    message: 'Пожалуйста, выберите вид работы!',
  }),
});

export type EmployeeFormValues = z.infer<typeof EmployeeFormSchema>;

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  isActive: true;
  phone: string;
  pinCode: number;
  types: WorkType[];
  dateOfRegister: Date;
  dateOfEmployment: Date;
}
export interface CreateEmployeeReturnType {
  firstName: string;
  lastName: string;
  pinCode: number;
}

export const EmployeeUpdateFormSchema = z.object({
  employeeId: z.number(),
  lastName: z
    .string()
    .regex(RegEx.fullName, {
      message:
        'Фамилия должно содержать только кириллицу, должно начинаться с заглавной буквы',
    })
    .nullable(),
  firstName: z
    .string()
    .regex(RegEx.fullName, {
      message:
        'Имя должно содержать только кириллицу, должно начинаться с заглавной буквы',
    })
    .nullable(),
  middleName: z
    .string()
    .regex(RegEx.fullName, {
      message:
        'Отчество должно содержать только кириллицу, должно начинаться с заглавной буквы',
    })
    .nullable(),
  phone: z.string().nullable(),
  pinCode: z.number().nullable(),
  isActive: z.boolean(),
  changedTypesId: z.any().array().nullable(),
  dateOfDismissal: z
    .date({
      required_error: 'Пожалуйста, выберите дату',
      invalid_type_error: 'Не правильный формат даты!',
    })
    .nullable(),
  dateOfEmployment: z
    .date({
      required_error: 'Пожалуйста, выберите дату',
      invalid_type_error: 'Не правильный формат даты!',
    })
    .nullable(),
});

export type EmployeeUpdateFormValues = z.infer<typeof EmployeeUpdateFormSchema>;
