import { z } from 'zod';

export const blockInputSchema = z.object({
  title: z
    .string({ error: 'Informe o nome do bloco.' })
    .trim()
    .min(1, 'Informe o nome do bloco.')
    .max(120, 'O nome deve ter no máximo 120 caracteres.'),
});

export type BlockInput = z.infer<typeof blockInputSchema>;
