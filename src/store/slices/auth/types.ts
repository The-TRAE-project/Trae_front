import { z } from 'zod';

export interface Response<T> {
  data: T;
}

export interface InitialState {
  user: User | null;
  permission: Roles | null;
  isLoading: 'idle' | 'pending';
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface User {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: number;
  role: Roles | string;
  dateOfRegister: Date;
}

export enum Roles {
  ADMIN = 'Администратор',
  EMPLOYEE = 'Терминал цех',
  CONSTRUCTOR = 'Конструктор',
}

export const LoginFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Логин должен быть не меньше 3 символов' })
    .max(15, { message: 'Логин должен быть больше 15 символов' }),
  password: z
    .string()
    .min(3, { message: 'Пароль должен быть не меньше 3 символов' })
    .max(15, { message: 'Пароль должен быть больше 15 символов' }),
});

export type LoginFormValues = z.infer<typeof LoginFormSchema>;
export interface TokenValue {
  accessToken: string;
  refreshToken: string;
}
