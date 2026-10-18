'use client';

import { PlayIcon } from '@heroicons/react/24/outline';
import EmptyState from '@/components/ui/EmptyState';
import type { Track } from '@/server/types';
import TrackHeader from './TrackHeader';
import TrackCard from './Track';

export function Tracks({
  tracks,
  readOnly = false,
}: {
  tracks: Track[];
  readOnly?: boolean;
}) {
  return (
    <div className="space-y-0.5 sm:space-y-1.5">
      <TrackHeader readOnly={readOnly} />
      {tracks.length === 0 ? (
        <EmptyState
          icon={PlayIcon}
          title="Nenhuma música ainda"
          description={
            readOnly
              ? 'Este bloco ainda não possui músicas.'
              : 'Use o menu do bloco e toque em + para adicionar uma música.'
          }
        />
      ) : (
        tracks.map((track) => (
          <TrackCard key={track.id} track={track} readOnly={readOnly} />
        ))
      )}
    </div>
  );
}
