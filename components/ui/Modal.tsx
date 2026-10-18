'use client';

import { useEffect, type ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';

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
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-0"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="max-h-[90vh] w-full overflow-y-auto rounded-2xl border border-orange-900 bg-surface p-4 shadow-2xl sm:w-[480px] sm:p-6"
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <div className="mb-4 flex items-center justify-between sm:mb-6">
            <h2 className="text-lg font-bold text-orange-400 sm:text-2xl">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="rounded-lg p-1 text-white/50 transition hover:bg-white/10 hover:text-white"
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

          <div className="flex justify-end gap-3 border-t border-orange-900 pt-4">
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
