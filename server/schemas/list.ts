import { z } from 'zod';

const title = z
  .string({ error: 'Informe o nome do repertório.' })
  .trim()
  .min(1, 'Informe o nome do repertório.')
  .max(120, 'O nome deve ter no máximo 120 caracteres.');

export const listCreateSchema = z.object({
  title,
});

export const listUpdateSchema = z.object({
  title,
  is_public: z.boolean(),
});

export type ListCreateInput = z.infer<typeof listCreateSchema>;
export type ListUpdateInput = z.infer<typeof listUpdateSchema>;
