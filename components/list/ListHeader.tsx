'use client';

import { useState } from 'react';
import {
  Bars3Icon,
  MusicalNoteIcon,
  PencilSquareIcon,
  PlusIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { IconButton } from '@/components/ui/Button';
import DropdownMenu, { type DropdownItem } from '@/components/ui/DropdownMenu';
import { useAction } from '@/components/ui/useAction';
import { deleteList } from '@/server/actions/lists';
import type { List } from '@/server/types';
import BlockFormModal from '../block/BlockFormModal';
import ListFormModal from './ListFormModal';

type Dialog = 'edit' | 'add-block' | null;

export default function ListHeader({ list }: { list: List }) {
  const [dialog, setDialog] = useState<Dialog>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const { run, pending, error } = useAction();

  function handleShare() {
    if (!list.is_public) {
      setNotice('Torne o repertório público para compartilhar o link.');
      return;
    }

    const url = `${window.location.origin}/view/${list.id}`;

    if (navigator.share) {
      navigator.share({ title: list.title, url }).catch(() => {});
      return;
    }

    navigator.clipboard
      .writeText(url)
      .then(() => setNotice('Link copiado para a área de transferência.'))
      .catch(() => setNotice('Não foi possível copiar o link.'));
  }

  function handleDelete() {
    if (!confirm('Remover este repertório?')) return;
    run(() => deleteList(list.id));
  }

  const menuItems: DropdownItem[] = [
    {
      label: 'Compartilhar',
      icon: <ShareIcon className="h-5 w-5" />,
      onSelect: handleShare,
    },
    {
      label: 'Editar',
      icon: <PencilSquareIcon className="h-5 w-5" />,
      onSelect: () => setDialog('edit'),
    },
    {
      label: 'Novo bloco',
      icon: <PlusIcon className="h-5 w-5" />,
      onSelect: () => setDialog('add-block'),
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
      <div className="mb-4 flex items-center justify-between gap-2 sm:mb-8">
        <div className="flex min-w-0 flex-1 items-start gap-2">
          <MusicalNoteIcon className="hidden h-8 w-8 shrink-0 text-orange-400 sm:block" />
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold text-orange-400 sm:text-2xl">
              {list.title}
            </h1>
            <p className="mt-0.5 truncate text-xs text-white/50 sm:text-sm">
              {list.is_public ? 'Repertório público' : 'Repertório privado'}
            </p>
          </div>
        </div>

        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <IconButton
            label="Compartilhar repertório"
            variant="ghost"
            icon={<ShareIcon className="h-5 w-5" />}
            onClick={handleShare}
          />
          <IconButton
            label="Editar repertório"
            variant="ghost"
            icon={<PencilSquareIcon className="h-5 w-5" />}
            onClick={() => setDialog('edit')}
          />
          <IconButton
            label="Novo bloco"
            icon={<PlusIcon className="h-6 w-6" />}
            onClick={() => setDialog('add-block')}
          />
          <IconButton
            label="Remover repertório"
            variant="danger"
            icon={<TrashIcon className="h-5 w-5" />}
            disabled={pending}
            onClick={handleDelete}
          />
        </div>

        <div className="sm:hidden">
          <DropdownMenu
            label="Ações do repertório"
            trigger={<Bars3Icon className="h-7 w-7 text-white/70" />}
            items={menuItems}
          />
        </div>
      </div>

      {notice && <p className="mb-4 text-sm text-blue-300">{notice}</p>}
      {error && (
        <p role="alert" className="mb-4 text-sm text-red-300">
          {error}
        </p>
      )}

      {dialog === 'edit' && <ListFormModal list={list} onClose={() => setDialog(null)} />}
      {dialog === 'add-block' && (
        <BlockFormModal listId={list.id} onClose={() => setDialog(null)} />
      )}
    </>
  );
}
