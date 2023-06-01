import { z } from 'zod';

import { RegEx } from '../../../constants/regex';
import { WorkType } from '../workTypes/types';

export const EmployeeFormSchema = z.object({
  lastName: z
    .string()
    .regex(RegEx.fullName, {
      message:
        'Фамилия должно содержать только кириллицу и начинаться с заглавной буквы',
    })
    .min(2, { message: 'Фамилия должна содержать не менее 2 символов. ' })
    .max(15, { message: 'Фамилия должно быть не больше 15 символов' }),
  firstName: z
    .string()
    .regex(RegEx.fullName, {
      message:
        'Имя должно содержать только кириллицу и начинаться с заглавной буквы',
    })
    .min(2, { message: 'Имя должно быть не меньше 2 символов' })
    .max(15, { message: 'Имя должно быть не больше 15 символов' }),
  middleName: z
    .string()
    .regex(RegEx.fullName, {
      message:
        'Отчество должно содержать только кириллицу и начинаться с заглавной буквы',
    })
    .nullable(),
  phone: z
    .string()
    .min(17, {
      message: 'Пожалуйста, введите номер в правильном формате',
    })
    .max(17, {
      message: 'Пожалуйста, введите номер в правильном формате',
    }),
  dateOfEmployment: z.date({
    required_error: 'Пожалуйста, выберите дату',
    invalid_type_error: 'Не правильный формат даты!',
  }),
  typesId: z.any().array().min(1, {
    message: 'Пожалуйста, выберите тип работ!',
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
  dateOfDismissal: Date | null;
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
        'Фамилия должно содержать только кириллицу и начинаться с заглавной буквы',
    })
    .nullable(),
  firstName: z
    .string()
    .regex(RegEx.fullName, {
      message:
        'Имя должно содержать только кириллицу и начинаться с заглавной буквы',
    })
    .nullable(),
  middleName: z
    .string()
    .regex(RegEx.fullName, {
      message:
        'Отчество должно содержать только кириллицу и начинаться с заглавной буквы',
    })
    .nullable(),
  phone: z
    .string()
    .min(17, {
      message: 'Пожалуйста, введите номер в правильном формате',
    })
    .max(17, {
      message: 'Пожалуйста, введите номер в правильном формате',
    })
    .nullable(),
  pinCode: z
    .number({
      required_error: 'Пожалуйста, введите пин кода в правильном формате',
      invalid_type_error: 'Не правильный формат пин кода!',
    })
    .nullable(),
  isActive: z.any().nullable(),
  changedTypesId: z
    .any()
    .array()
    .min(1, {
      message: 'Пожалуйста, выберите тип работ!',
    })
    .nullable(),
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

export interface EmployeeShortInfo {
  id: number;
  firstName: string;
  lastName: string;
}
