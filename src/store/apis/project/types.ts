import { z } from 'zod';

import { RegEx } from '../../../constants/regex';

export const OperationSchema = z.object({
  name: z.string(),
  typWorkId: z.number(),
});

export const CreateProjectSchema = z.object({
  customer: z
    .string()
    .regex(RegEx.name, {
      message: 'Имя клиента должно содержать только кириллицу!',
    })
    .min(3, { message: 'Имя клиента должен быть не меньше 3 символов' })
    .max(30, { message: 'Имя клиента должен быть не больше 30 символов' }),
  name: z
    .string()
    .regex(RegEx.name, {
      message: 'Имя проекта должно содержать только кириллицу!',
    })
    .min(3, { message: 'Имя проекта должен быть не меньше 3 символов' })
    .max(30, { message: 'Имя проекта должен быть не больше 30 символов' }),
  number: z
    .number()
    .min(3, { message: 'Номер проекта должен быть не меньше 3 символов' })
    .max(3, { message: 'Номер проекта должен быть не больше 3 символов' }),
  comment: z
    .string()
    .max(100, { message: 'Комментарий должен быть не больше 100 символов' })
    .nullable(),
  operations: OperationSchema.array().min(1, {
    message: 'Пожалуйста, выберите вид операции!',
  }),
  plannedEndDate: z.date({
    required_error: 'Пожалуйста, выберите дату',
    invalid_type_error: 'Не правильный формат даты!',
  }),
});

export type CreateProjectFormValues = z.infer<typeof CreateProjectSchema>;
