import { z } from 'zod';

import { RegEx } from '../../../constants/regex';

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
  operations: OperationSchema.array().min(2, {
    message: 'Пожалуйста, выберите вид операции',
  }),
  plannedEndDate: z.date({
    required_error: 'Пожалуйста, выберите дату',
    invalid_type_error: 'Не правильный формат даты',
  }),
});

export type CreateProjectFormValues = z.infer<typeof CreateProjectSchema>;
