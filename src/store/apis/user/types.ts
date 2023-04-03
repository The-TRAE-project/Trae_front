import { z } from 'zod';
import { RegEx } from '../../../constants/regex';

export interface ManagerFormValue {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
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

export interface FilteredResponse<T> {
  content: T;
  currentNumberPage: number;
  totalElements: number;
  totalPages: number;
}

export interface UserLoginValue {
  password: string;
  username: string;
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
  username: z
    .string()
    .regex(RegEx.username, {
      message: 'Логин не должен содержать только кириллицу',
    })
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

export interface User {
  id: number;
  lastName: string;
  middleName: string;
  firstName: string;
  username: string;
  phone: string;
  role: string;
  status: boolean;
  dateOfDismissal: Date | null;
  dateOfEmployment?: string;
}

export interface UserUpdateReturnType {
  lastName: string;
  firstName: string;
  role: string;
  accountStatus: boolean;
  dateOfDismissal: number[];
}

export interface ResetPasswordReturnType {
  firstName: string;
  lastName: string;
  newPassword: string;
}

export const UserUpdateSchema = z.object({
  managerId: z.number().min(1, { message: 'Id конструктора не указан!' }),
  newRole: z.string().min(1, { message: 'Выберите новую роль' }).nullable(),
  accountStatus: z.any().nullable(),
  dateOfDismissal: z
    .date({
      required_error: 'Пожалуйста, выберите дату',
      invalid_type_error: 'Не правильный формат даты!',
    })
    .nullable(),
});

export type UserUpdateFormValues = z.infer<typeof UserUpdateSchema>;
