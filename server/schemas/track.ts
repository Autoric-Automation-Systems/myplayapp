import { z } from 'zod';

export const trackInputSchema = z.object({
  title: z
    .string({ error: 'Informe o título da música.' })
    .trim()
    .min(1, 'Informe o título da música.')
    .max(200, 'O título deve ter no máximo 200 caracteres.'),
  artist: z.string().trim().max(200, 'O artista deve ter no máximo 200 caracteres.').default(''),
  key: z.string().trim().max(10, 'O tom deve ter no máximo 10 caracteres.').default(''),
  bpm: z.coerce
    .number({ error: 'Informe o BPM.' })
    .int('O BPM deve ser um número inteiro.')
    .min(20, 'O BPM mínimo é 20.')
    .max(400, 'O BPM máximo é 400.'),
  style: z.string().trim().max(60, 'O estilo deve ter no máximo 60 caracteres.').default(''),
  lyrics: z.string().max(20_000, 'A letra deve ter no máximo 20.000 caracteres.').default(''),
});

export type TrackInput = z.infer<typeof trackInputSchema>;
