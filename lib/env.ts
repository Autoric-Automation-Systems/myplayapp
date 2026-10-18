import { z } from 'zod';

const schema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL não configurada. Veja o .env.example.'),
  AUTH_SECRET: z.string().min(1),
  AUTH_GOOGLE_ID: z.string().min(1),
  AUTH_GOOGLE_SECRET: z.string().min(1),
  AUTH_URL: z.string().url().optional(),
});

export type Env = z.infer<typeof schema>;

let cached: Env | null = null;

/** Valida as variáveis no primeiro uso: falha no boot em vez de no meio de um login. */
export function env(): Env {
  if (cached) return cached;

  const parsed = schema.safeParse({
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    AUTH_URL: process.env.AUTH_URL || undefined,
  });

  if (!parsed.success) {
    const missing = z.flattenError(parsed.error).fieldErrors;
    const message = Object.entries(missing)
      .map(([key, errors]) => `${key}: ${errors?.join(', ')}`)
      .join(' | ');
    throw new Error(`Configuração de ambiente inválida — ${message}`);
  }

  cached = parsed.data;
  return cached;
}
