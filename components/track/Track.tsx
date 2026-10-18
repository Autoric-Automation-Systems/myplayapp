'use client';

import { useState, type MouseEvent } from 'react';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { IconButton } from '@/components/ui/Button';
import DropdownMenu, { type DropdownItem } from '@/components/ui/DropdownMenu';
import { useAction } from '@/components/ui/useAction';
import { usePanel } from '@/context/PanelContext';
import { deleteTrack, moveTrack } from '@/server/actions/tracks';
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

  function handleDelete(event?: MouseEvent<HTMLButtonElement>) {
    event?.stopPropagation();
    if (!confirm('Remover esta música?')) return;
    run(() => deleteTrack(track.id));
  }

  const menuItems: DropdownItem[] = [
    {
      label: 'Editar',
      icon: <PencilSquareIcon className="h-5 w-5" />,
      onSelect: () => setEditing(true),
    },
    {
      label: 'Mover para cima',
      icon: <ArrowUpIcon className="h-5 w-5" />,
      onSelect: () => run(() => moveTrack(track.id, 'up')),
    },
    {
      label: 'Mover para baixo',
      icon: <ArrowDownIcon className="h-5 w-5" />,
      onSelect: () => run(() => moveTrack(track.id, 'down')),
    },
    {
      label: 'Remover',
      icon: <TrashIcon className="h-5 w-5" />,
      onSelect: () => handleDelete(),
      danger: true,
    },
  ];

  return (
    <>
      <div className="flex items-center gap-2 rounded-lg border border-transparent bg-white/[0.03] px-2 py-1.5 text-white/80 transition-all hover:border-orange-800/40 hover:bg-white/[0.07] sm:px-3">
        <button
          type="button"
          onClick={() => openPanel(track)}
          className="flex min-w-0 flex-1 items-center gap-2 py-1 text-left sm:py-1.5"
        >
          <span className="min-w-0 flex-1">
            <span className="block truncate pl-1 text-sm text-white sm:pl-2">{track.title}</span>
            <span className="mt-0.5 flex items-center gap-1.5 pl-1 text-[11px] text-white/55 sm:hidden">
              <span className="max-w-[45%] truncate">{track.artist || 'Sem artista'}</span>
              <span aria-hidden>·</span>
              <span className="shrink-0">{track.key || '—'}</span>
              <span aria-hidden>·</span>
              <span className="shrink-0">{track.bpm} BPM</span>
            </span>
          </span>
          <span className="hidden truncate pl-2 sm:block sm:flex-[2]">{track.artist}</span>
          <span className="hidden w-12 text-center text-sm sm:block">{track.key}</span>
          <span className="hidden w-14 text-center text-sm sm:block">{track.bpm}</span>
          <span className="hidden w-14 truncate text-center text-sm md:block">{track.style}</span>
        </button>

        {!readOnly && (
          <div className="flex shrink-0 items-center justify-end gap-1 pr-1 sm:pr-2">
            <div className="hidden items-center gap-1 sm:flex">
              <IconButton
                label="Mover para cima"
                size="sm"
                variant="ghost"
                icon={<ArrowUpIcon className="h-4 w-4" />}
                disabled={pending}
                onClick={(event) => {
                  event.stopPropagation();
                  run(() => moveTrack(track.id, 'up'));
                }}
              />
              <IconButton
                label="Mover para baixo"
                size="sm"
                variant="ghost"
                icon={<ArrowDownIcon className="h-4 w-4" />}
                disabled={pending}
                onClick={(event) => {
                  event.stopPropagation();
                  run(() => moveTrack(track.id, 'down'));
                }}
              />
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

            <div className="sm:hidden">
              <DropdownMenu
                label="Ações da música"
                trigger={<EllipsisVerticalIcon className="h-5 w-5 text-white/60" />}
                items={menuItems}
              />
            </div>
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
