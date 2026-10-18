'use client';

import { useEffect, type ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';
import { useBodyScrollLock } from './useBodyScrollLock';

export default function Modal({
  title,
  submitLabel = 'Salvar',
  pending = false,
  error,
  onClose,
  onSubmit,
  children,
}: {
  title: string;
  submitLabel?: string;
  pending?: boolean;
  error?: string | null;
  onClose: () => void;
  onSubmit: () => void;
  children: ReactNode;
}) {
  useBodyScrollLock();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex animate-fade-in items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="max-h-[92dvh] w-full overflow-y-auto rounded-t-2xl border border-orange-900 bg-surface p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl sm:max-h-[85dvh] sm:w-[480px] sm:rounded-2xl sm:p-6 sm:pb-6"
      >
        <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-white/20 sm:hidden" />

        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <div className="mb-4 flex items-center justify-between gap-3 sm:mb-6">
            <h2 className="min-w-0 truncate text-lg font-bold text-orange-400 sm:text-2xl">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="shrink-0 rounded-lg p-2 text-white/50 transition hover:bg-white/10 hover:text-white"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {children}

          {error && (
            <p role="alert" className="mb-3 rounded-lg bg-red-900/40 p-2.5 text-sm text-red-200">
              {error}
            </p>
          )}

          <div className="mt-2 flex justify-end gap-3 border-t border-orange-900 pt-4">
            <Button variant="secondary" onClick={onClose} disabled={pending}>
              Cancelar
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? 'Salvando…' : submitLabel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
