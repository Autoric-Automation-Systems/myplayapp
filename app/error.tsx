'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { logError } from '@/lib/logger';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logError('app.render_failed', error, { digest: error.digest });
  }, [error]);

  return (
    <div className="flex min-h-[60dvh] items-center justify-center p-6 text-white">
      <div className="w-full max-w-md space-y-4 text-center">
        <h1 className="text-xl font-bold text-orange-400">Algo saiu do tom</h1>
        <p className="text-sm text-white/60">
          Não foi possível carregar esta tela. Tente de novo; se o problema continuar, volte ao
          início.
        </p>
        <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-green-600 px-5 text-sm font-semibold transition-colors hover:bg-green-500"
          >
            Tentar de novo
          </button>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white"
          >
            Ir para o início
          </Link>
        </div>
      </div>
    </div>
  );
}
