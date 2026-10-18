'use client';

import { useState } from 'react';
import type { Track } from '@/server/types';

export function TrackMeta({ track }: { track: Track }) {
  return (
    <div className="flex flex-wrap gap-2">
      {track.key && (
        <span className="rounded-lg bg-orange-800/50 px-2.5 py-0.5 text-xs font-medium text-orange-300">
          {track.key}
        </span>
      )}
      {track.bpm > 0 && (
        <span className="rounded-lg bg-cyan-800/50 px-2.5 py-0.5 font-mono text-xs font-medium text-cyan-300">
          {track.bpm} BPM
        </span>
      )}
      {track.style && (
        <span className="rounded-lg bg-purple-800/50 px-2.5 py-0.5 text-xs font-medium text-purple-300">
          {track.style}
        </span>
      )}
    </div>
  );
}

export function Lyrics({ lyrics }: { lyrics: string }) {
  const [font, setFont] = useState(16);

  return (
    <>
      <div className="mb-4 flex items-center gap-3 rounded-xl bg-black/20 p-3">
        <span className="text-[10px] font-medium uppercase tracking-wider text-white/40">
          Tamanho
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setFont((value) => Math.max(value - 2, 10))}
            disabled={font <= 10}
            className="h-9 min-w-11 rounded-lg bg-white/10 px-3 text-sm font-medium text-white/70 transition hover:bg-white/20 hover:text-white disabled:opacity-40"
          >
            A-
          </button>
          <span className="w-10 text-center font-mono text-xs text-white/60">{font}px</span>
          <button
            type="button"
            onClick={() => setFont((value) => Math.min(value + 2, 32))}
            disabled={font >= 32}
            className="h-9 min-w-11 rounded-lg bg-white/10 px-3 text-sm font-medium text-white/70 transition hover:bg-white/20 hover:text-white disabled:opacity-40"
          >
            A+
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-white/5 bg-black/30 p-4">
        {lyrics ? (
          <pre
            className="whitespace-pre-wrap font-sans leading-relaxed text-white/90"
            style={{ fontSize: `${font}px` }}
          >
            {lyrics}
          </pre>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center text-white/30">
            <span className="mb-2 text-2xl">📝</span>
            <p className="text-sm">Nenhuma letra disponível</p>
          </div>
        )}
      </div>
    </>
  );
}
