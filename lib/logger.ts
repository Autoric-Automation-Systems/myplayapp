type Level = 'warn' | 'error';

type Context = Record<string, unknown>;

/**
 * Log estruturado em uma linha JSON: o Vercel e qualquer coletor conseguem
 * filtrar por `event` e `context` sem precisar de um SDK.
 */
export function log(level: Level, event: string, error?: unknown, context?: Context) {
  const payload = {
    level,
    event,
    timestamp: new Date().toISOString(),
    ...(context ? { context } : {}),
    ...(error instanceof Error
      ? { error: { name: error.name, message: error.message, stack: error.stack } }
      : error !== undefined
        ? { error }
        : {}),
  };

  const line = JSON.stringify(payload);
  if (level === 'error') console.error(line);
  else console.warn(line);
}

export function logError(event: string, error: unknown, context?: Context) {
  log('error', event, error, context);
}

export function logWarn(event: string, error?: unknown, context?: Context) {
  log('warn', event, error, context);
}
