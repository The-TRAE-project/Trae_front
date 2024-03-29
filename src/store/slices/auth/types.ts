import { z } from 'zod';

export interface Response<T> {
  data: T;
}

export interface InitialState {
  username: string | null;
  permission: Roles | null;
  isLoading: 'idle' | 'pending';
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export enum Roles {
  ADMIN = 'Администратор',
  EMPLOYEE = 'Терминал цех',
  CONSTRUCTOR = 'Конструктор',
}

export const LoginFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Введите Логин' })
    .max(15, { message: 'Логин должен быть больше 15 символов' }),
  password: z
    .string()
    .min(3, { message: 'Введите пароль' })
    .max(15, { message: 'Пароль должен быть больше 15 символов' }),
});

export type LoginFormValues = z.infer<typeof LoginFormSchema>;
export interface TokenValue {
  accessToken: string;
  refreshToken: string;
}

export interface UserRoleValues {
  username: string;
  permission: Roles;
}
