'use client';

import { useEffect } from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { usePanel } from '@/context/PanelContext';
import { useBodyScrollLock } from '@/components/ui/useBodyScrollLock';
import { Lyrics, TrackMeta } from './Lyrics';

export default function MobilePanel() {
  const { isOpen, track, closePanel } = usePanel();

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closePanel();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closePanel]);

  if (!isOpen || !track) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 animate-fade-in bg-black/60 lg:hidden" onClick={closePanel} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Letra de ${track.title}`}
        className="fixed inset-x-0 bottom-0 z-50 flex max-h-[88dvh] animate-slide-up flex-col overflow-hidden rounded-t-2xl bg-surface shadow-2xl lg:hidden"
      >
        <div className="flex shrink-0 justify-center pb-1 pt-2">
          <div className="h-1 w-10 rounded-full bg-white/20" />
        </div>

        <div className="flex shrink-0 items-start justify-between gap-2 border-b border-orange-900/30 px-4 pb-3 pt-1">
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-lg font-bold leading-tight text-orange-400">
              {track.title}
            </h2>
            {track.artist && <p className="mt-0.5 truncate text-sm text-white/50">{track.artist}</p>}
          </div>
          <button
            type="button"
            onClick={closePanel}
            aria-label="Fechar painel"
            className="-mr-1 shrink-0 rounded-lg p-2 text-white/40 transition hover:bg-white/10 hover:text-white"
          >
            <XCircleIcon className="h-7 w-7" />
          </button>
        </div>

        <div className="shrink-0 px-4 py-3">
          <TrackMeta track={track} />
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <Lyrics lyrics={track.lyrics} />
        </div>
      </div>
    </>
  );
}
