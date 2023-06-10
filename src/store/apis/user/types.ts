import { z } from 'zod';

import { RegEx } from '../../../constants/regex';

export interface UserLoginValue {
  password: string;
  username: string;
}
export interface UserShortInfo {
  firstName: string;
  lastName: string;
  managerId: number;
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
        'Фамилия должна содержать только кириллицу и начинаться с заглавной буквы',
    })
    .min(2, { message: 'Фамилия должна содержать не менее 2 символов.' })
    .max(15, { message: 'Фамилия должна содержать не больше 15 символов.' }),
  firstName: z
    .string()
    .regex(RegEx.fullName, {
      message:
        'Имя должно содержать только кириллицу и начинаться с заглавной буквы',
    })
    .min(2, { message: 'Имя должно содержать не менее 2 символов.' })
    .max(15, { message: 'Имя должно содержать не больше 15 символов.' }),
  middleName: z
    .string()
    .regex(RegEx.fullName, {
      message:
        'Отчество должно содержать только кириллицу и начинаться с заглавной буквы',
    })
    .nullable(),
  username: z
    .string()
    .regex(RegEx.username, {
      message: 'Логин не должен содержать только кириллицу!',
    })
    .min(3, { message: 'Логин должен содержать не меньше 3 символов' })
    .max(15, { message: 'Логин должен содержать не больше 15 символов' }),
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

export interface UserEditReturnType {
  firstName: string;
  lastName: string;
  middleName: string;
  password: string;
  phone: string;
}

export const UserEditSchema = z.object({
  username: z.string().min(1, { message: 'Имя пользователя не указано!' }),
  lastName: z
    .string()
    .regex(RegEx.fullName, {
      message:
        'Фамилия должно содержать только кириллицу и начинаться с заглавной буквы',
    })
    .min(2, { message: 'Фамилия должна содержать не менее 2 символов.' })
    .max(15, { message: 'Фамилия должна содержать не больше 15 символов.' })
    .nullable(),
  firstName: z
    .string()
    .regex(RegEx.fullName, {
      message:
        'Имя должно содержать только кириллицу и начинаться с заглавной буквы',
    })
    .min(2, { message: 'Имя должно содержать не менее 2 символов.' })
    .max(15, { message: 'Имя должно содержать не больше 15 символов.' })
    .nullable(),
  middleName: z
    .string()
    .regex(RegEx.fullName, {
      message:
        'Отчество должно содержать только кириллицу и начинаться с заглавной буквы',
    })
    .optional()
    .nullable()
    .or(z.literal('')),
  phone: z
    .string()
    .min(17, {
      message: 'Пожалуйста, введите номер в правильном формате',
    })
    .max(17, {
      message: 'Пожалуйста, введите номер в правильном формате',
    })
    .nullable(),
  newPassword: z
    .string()
    .min(3, {
      message: 'Пожалуйста, введите новый пароль!',
    })
    .nullable(),
  oldPassword: z
    .string()
    .min(3, {
      message: 'Пожалуйста, введите старый пароль!',
    })
    .nullable(),
});

export type UserEditFormValues = z.infer<typeof UserEditSchema>;

export const UserChangePasswordSchema = UserEditSchema.extend({
  oldPassword: z
    .string()
    .min(3, {
      message: 'Пароль должен быть не меньше 3 символов!',
    })
    .max(30, { message: 'Пароль должен быть не больше 30 символов!' }),
  newPassword: z
    .string()
    .min(3, {
      message: 'Пароль должен быть не меньше 3 символов!',
    })
    .max(30, { message: 'Пароль должен быть не больше 30 символов!' }),
});

export type UserChangePasswordFormValues = z.infer<
  typeof UserChangePasswordSchema
>;

export interface UserAdditionalInfo {
  managerId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
}
