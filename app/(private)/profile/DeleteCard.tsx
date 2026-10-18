'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { deleteAccount } from '@/server/actions/account';

export default function DeleteCard() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleDelete() {
    if (!confirm('Tem certeza que deseja deletar sua conta? Esta ação é irreversível.')) {
      return;
    }

    setError(null);
    startTransition(async () => {
      try {
        const result = await deleteAccount();
        if (!result.ok) {
          setError(result.error);
          return;
        }

        await signOut({ redirect: false });
        router.replace(result.redirectTo ?? '/');
      } catch {
        setError('Não foi possível deletar a conta. Tente novamente.');
      }
    });
  }

  return (
    <div className="rounded-xl border border-red-900/50 bg-red-950/30 p-4 sm:p-6">
      <h3 className="mb-2 text-base font-semibold text-red-300 sm:text-lg">Zona de Perigo</h3>
      <p className="mb-4 text-sm text-red-200/80">
        Ao deletar sua conta, todos os seus repertórios, blocos e músicas serão permanentemente
        removidos.
      </p>

      {error && (
        <p role="alert" className="mb-3 rounded-lg bg-red-900/40 p-2.5 text-sm text-red-200">
          {error}
        </p>
      )}

      <Button
        variant="danger"
        className="w-full"
        disabled={pending}
        onClick={handleDelete}
        aria-label="Deletar minha conta"
      >
        <TrashIcon className="h-5 w-5" />
        {pending ? 'Deletando…' : 'Deletar minha conta'}
      </Button>
    </div>
  );
}
