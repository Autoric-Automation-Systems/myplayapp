'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { ActionResult } from '@/server/action-result';

export function useAction() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function run(action: () => Promise<ActionResult>, onSuccess?: () => void) {
    setError(null);
    startTransition(async () => {
      try {
        const result = await action();
        if (!result.ok) {
          setError(result.error);
          return;
        }

        onSuccess?.();

        if (result.redirectTo) {
          router.push(result.redirectTo);
          router.refresh();
        }
      } catch {
        setError('Não foi possível concluir a ação. Verifique sua conexão.');
      }
    });
  }

  return { pending, error, setError, run };
}
