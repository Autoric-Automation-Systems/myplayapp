'use client';

import { useState } from 'react';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Bars3Icon,
  PencilSquareIcon,
  PlusIcon,
  RectangleGroupIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { IconButton } from '@/components/ui/Button';
import DropdownMenu, { type DropdownItem } from '@/components/ui/DropdownMenu';
import { useAction } from '@/components/ui/useAction';
import { deleteBlock, moveBlock } from '@/server/actions/blocks';
import type { Block } from '@/server/types';
import TrackFormModal from '../track/TrackFormModal';
import BlockFormModal from './BlockFormModal';

type Dialog = 'edit' | 'add-track' | null;

export default function BlockHeader({
  block,
  readOnly = false,
}: {
  block: Block;
  readOnly?: boolean;
}) {
  const [dialog, setDialog] = useState<Dialog>(null);
  const { run, pending, error } = useAction();

  function handleDelete() {
    if (!confirm('Remover este bloco?')) return;
    run(() => deleteBlock(block.id));
  }

  const menuItems: DropdownItem[] = [
    {
      label: 'Editar',
      icon: <PencilSquareIcon className="h-5 w-5" />,
      onSelect: () => setDialog('edit'),
    },
    {
      label: 'Mover para cima',
      icon: <ArrowUpIcon className="h-5 w-5" />,
      onSelect: () => run(() => moveBlock(block.id, 'up')),
    },
    {
      label: 'Mover para baixo',
      icon: <ArrowDownIcon className="h-5 w-5" />,
      onSelect: () => run(() => moveBlock(block.id, 'down')),
    },
    {
      label: 'Nova música',
      icon: <PlusIcon className="h-5 w-5" />,
      onSelect: () => setDialog('add-track'),
    },
    {
      label: 'Remover',
      icon: <TrashIcon className="h-5 w-5" />,
      onSelect: handleDelete,
      danger: true,
    },
  ];

  return (
    <>
      <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4">
        <div className="flex min-w-0 flex-1 items-start gap-2">
          <RectangleGroupIcon className="hidden h-7 w-7 shrink-0 text-orange-400 sm:block" />
          <h2 className="truncate text-sm font-bold text-orange-400 sm:text-xl">{block.title}</h2>
        </div>

        {!readOnly && (
          <>
            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <IconButton
                label="Mover bloco para cima"
                size="sm"
                variant="ghost"
                icon={<ArrowUpIcon className="h-4 w-4" />}
                disabled={pending}
                onClick={() => run(() => moveBlock(block.id, 'up'))}
              />
              <IconButton
                label="Mover bloco para baixo"
                size="sm"
                variant="ghost"
                icon={<ArrowDownIcon className="h-4 w-4" />}
                disabled={pending}
                onClick={() => run(() => moveBlock(block.id, 'down'))}
              />
              <IconButton
                label="Editar bloco"
                size="sm"
                variant="ghost"
                icon={<PencilSquareIcon className="h-4 w-4" />}
                onClick={() => setDialog('edit')}
              />
              <IconButton
                label="Nova música"
                size="sm"
                icon={<PlusIcon className="h-5 w-5" />}
                onClick={() => setDialog('add-track')}
              />
              <IconButton
                label="Remover bloco"
                size="sm"
                variant="danger"
                icon={<TrashIcon className="h-4 w-4" />}
                disabled={pending}
                onClick={handleDelete}
              />
            </div>

            <div className="sm:hidden">
              <DropdownMenu
                label="Ações do bloco"
                trigger={<Bars3Icon className="h-6 w-6 text-white/70" />}
                items={menuItems}
              />
            </div>
          </>
        )}
      </div>

      {error && (
        <p role="alert" className="mb-2 text-xs text-red-300">
          {error}
        </p>
      )}

      {dialog === 'edit' && (
        <BlockFormModal listId={block.list_id} block={block} onClose={() => setDialog(null)} />
      )}
      {dialog === 'add-track' && (
        <TrackFormModal blockId={block.id} onClose={() => setDialog(null)} />
      )}
    </>
  );
}
