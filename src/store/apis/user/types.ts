import { z } from 'zod';
import { Roles } from '../../slices/auth/types';

export interface ManagerFormValue {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  username: string;
}

export interface ManagerLoginValue {
  password: string;
  username: string;
}

export interface ManagerUpdateValue {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
}

export interface ManagerChangeRoleValue {
  managerId: number;
  newRole: string;
}

export interface ManagerChangePasswordValue {
  newPassword: string;
  oldPassword: string;
}

export interface Manager {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  role: Roles;
  dateOfRegister: string;
}

export interface FilteredResponse<T> {
  content: T;
  totalElements: number;
}
export interface UserShortInfo {
  firstName: string;
  lastName: string;
  managerId: number;
}

export interface UserFilterValues {
  elementPerPage?: string;
  page?: string;
  role?: string;
  status?: string;
}

export enum Status {
  ACTIVE = 'true',
  NOT_ACTIVE = 'false',
}

export const ConstructorFormSchema = z.object({
  lastName: z
    .string()
    .regex(/^(?:[А-ЯЁа-яё0-9]{3,15})/, { message: 'Только кириллица' })
    .min(3, { message: 'Фамилия должен быть не меньше 2 символов' })
    .max(15, { message: 'Фамилия должен быть не больше 15 символов' }),
  firstName: z
    .string()
    .regex(/^(?:[А-ЯЁа-яё0-9]{3,15})/, { message: 'Только кириллица' })
    .min(3, { message: 'Имя должен быть не меньше 2 символов' })
    .max(15, { message: 'Имя должен быть не больше 15 символов' }),
  middleName: z
    .string()
    .regex(/^(?:[А-ЯЁа-яё0-9]{3,15})/, { message: 'Только кириллица' })
    .nullable(),
  username: z
    .string()
    .min(3, { message: 'Логин должен быть не меньше 3 символов' })
    .max(15, { message: 'Логин должен быть не больше 15 символов' }),
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
});

export type ConstructorFormValues = z.infer<typeof ConstructorFormSchema>;
