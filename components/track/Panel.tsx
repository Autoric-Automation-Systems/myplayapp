'use client';

import { ArrowUturnLeftIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { usePanel } from '@/context/PanelContext';
import { Lyrics, TrackMeta } from './Lyrics';

export default function Panel() {
  const { track, closePanel } = usePanel();

  if (!track) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-xl bg-surface p-6 text-white/40">
        <ArrowUturnLeftIcon className="h-8 w-8" />
        <p className="text-lg font-medium">Selecione uma música</p>
        <p className="mt-2 text-sm">Clique para ver os detalhes</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto rounded-xl bg-surface p-6">
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-orange-900/30 pb-4">
        <div className="min-w-0">
          <h2 className="text-2xl font-bold leading-tight text-orange-400">{track.title}</h2>
          {track.artist && <p className="mt-1 text-sm text-white/50">{track.artist}</p>}
        </div>
        <button
          type="button"
          onClick={closePanel}
          aria-label="Fechar painel"
          className="shrink-0 rounded-lg p-1.5 text-white/40 transition hover:bg-white/10 hover:text-white"
        >
          <XCircleIcon className="h-8 w-8" />
        </button>
      </div>

      <div className="mb-6">
        <TrackMeta track={track} />
      </div>

      <Lyrics lyrics={track.lyrics} />
    </div>
  );
}
