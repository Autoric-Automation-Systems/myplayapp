'use client';

import { useState, type MouseEvent } from 'react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { IconButton } from '@/components/ui/Button';
import { useAction } from '@/components/ui/useAction';
import { usePanel } from '@/context/PanelContext';
import { deleteTrack } from '@/server/actions/tracks';
import type { Track } from '@/server/types';
import TrackFormModal from './TrackFormModal';

export default function TrackCard({
  track,
  readOnly = false,
}: {
  track: Track;
  readOnly?: boolean;
}) {
  const { openPanel } = usePanel();
  const [editing, setEditing] = useState(false);
  const { run, pending, error } = useAction();

  function handleDelete(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    if (!confirm('Remover esta música?')) return;
    run(() => deleteTrack(track.id));
  }

  return (
    <>
      <div className="flex items-center gap-2 rounded-lg border border-transparent bg-white/[0.03] px-2 py-2 text-white/80 transition-all hover:border-orange-800/40 hover:bg-white/[0.07] sm:px-3 sm:py-1.5">
        <button
          type="button"
          onClick={() => openPanel(track)}
          className="flex min-w-0 flex-1 items-center gap-2 text-left"
        >
          <span className="flex-1 truncate pl-2 sm:flex-[2]">{track.title}</span>
          <span className="hidden truncate pl-2 sm:block sm:flex-[2]">{track.artist}</span>
          <span className="w-10 text-center text-[11px] sm:w-12 sm:text-sm">{track.key}</span>
          <span className="w-12 text-center text-[11px] sm:w-14 sm:text-sm">{track.bpm}</span>
          <span className="hidden w-14 truncate text-center text-sm md:block">{track.style}</span>
        </button>

        {!readOnly && (
          <div className="flex w-20 shrink-0 items-center justify-end gap-1 pr-2 sm:w-28">
            <IconButton
              label="Editar música"
              size="sm"
              variant="ghost"
              icon={<PencilSquareIcon className="h-4 w-4" />}
              onClick={(event) => {
                event.stopPropagation();
                setEditing(true);
              }}
            />
            <IconButton
              label="Remover música"
              size="sm"
              variant="ghost"
              icon={<TrashIcon className="h-4 w-4" />}
              disabled={pending}
              onClick={handleDelete}
            />
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="px-3 py-1 text-xs text-red-300">
          {error}
        </p>
      )}

      {editing && (
        <TrackFormModal
          blockId={track.block_id}
          track={track}
          onClose={() => setEditing(false)}
        />
      )}
    </>
  );
}
