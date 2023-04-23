import { z } from 'zod';

import { RegEx } from '../../../constants/regex';

export interface WorkType {
  id: number;
  isActive: boolean;
  name: string;
}

export const WorkTypeSchema = z.object({
  name: z
    .string()
    .regex(RegEx.cyrillic, {
      message: 'Название должно содержать только кириллицу',
    })
    .min(3, { message: 'Название должно быть не меньше 3 символов' })
    .max(30, { message: 'Название должно быть не больше 30 символов' }),
});

export type CreateWorkTypeFormValues = z.infer<typeof WorkTypeSchema>;

export const EditWorkTypeSchema = z.object({
  isActive: z.any().nullable(),
  newName: z
    .string()
    .regex(RegEx.cyrillic, {
      message: 'Название должно содержать кириллицу',
    })
    .min(3, { message: 'Название должно быть не меньше 3 символов' })
    .max(30, { message: 'Название должно быть не больше 30 символов' })
    .nullable(),
  typeWorkId: z
    .number()
    .min(1, { message: 'Пожалуйста, укажите id вида работы' }),
});

export type EditWorkTypeFormValues = z.infer<typeof EditWorkTypeSchema>;

export interface ResponseWorkTypeValues {
  id: number;
  isActive: boolean | null;
  name: string | null;
}
