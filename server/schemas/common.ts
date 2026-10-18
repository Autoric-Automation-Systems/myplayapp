import { z } from 'zod';

export const idSchema = z.uuid('Identificador inválido.');

export function parseId(id: unknown): string | null {
  const parsed = idSchema.safeParse(id);
  return parsed.success ? parsed.data : null;
}
