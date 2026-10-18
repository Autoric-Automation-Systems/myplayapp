import { z, type ZodError } from 'zod';
import { unstable_rethrow } from 'next/navigation';
import { logError } from '@/lib/logger';
import { AppError } from '@/server/errors';

export type ActionResult =
  | { ok: true; redirectTo?: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export function validationError(error: ZodError): ActionResult {
  const { fieldErrors } = z.flattenError(error) as {
    fieldErrors: Record<string, string[] | undefined>;
  };
  const cleaned: Record<string, string[]> = {};

  for (const [field, messages] of Object.entries(fieldErrors)) {
    if (messages?.length) cleaned[field] = messages;
  }

  return {
    ok: false,
    error: Object.values(cleaned)[0]?.[0] ?? 'Dados inválidos.',
    fieldErrors: cleaned,
  };
}

export function actionError(error: unknown): ActionResult {
  // Repassa redirect()/notFound() lançados dentro do fluxo sem convertê-los em erro genérico.
  unstable_rethrow(error);

  if (error instanceof AppError) {
    return { ok: false, error: error.message };
  }

  logError('action.unexpected_error', error);
  return { ok: false, error: 'Não foi possível concluir a ação. Tente novamente.' };
}

export function withMessage(
  path: string,
  title: string,
  message: string,
  type: 'success' | 'error' | 'info' | 'warning' = 'success'
): ActionResult {
  const params = new URLSearchParams({ title, message, type });
  return { ok: true, redirectTo: `${path}?${params.toString()}` };
}
