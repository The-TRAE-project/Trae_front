import { z } from 'zod';

export interface WorkType {
  id: number;
  isActive: boolean;
  name: string;
}

export const WorkTypeSchema = z.object({
  name: z.string().min(1, { message: 'Пожалуйста, заполните поле!' }),
});

export type CreateWorkTypeFormValues = z.infer<typeof WorkTypeSchema>;

export const EditWorkTypeSchema = z.object({
  isActive: z.any().nullable(),
  newName: z.string().nullable(),
  typeWorkId: z
    .number()
    .min(1, { message: 'Пожалуйста, укажите id вида работы!' }),
});

export type EditWorkTypeFormValues = z.infer<typeof EditWorkTypeSchema>;

export interface ResponseWorkTypeValues {
  id: number;
  isActive: boolean | null;
  name: string | null;
}
