'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { Field, TextInput } from '@/components/ui/form';
import { useAction } from '@/components/ui/useAction';
import { createBlock, updateBlock } from '@/server/actions/blocks';
import type { Block } from '@/server/types';

export default function BlockFormModal({
  listId,
  block,
  onClose,
}: {
  listId: string;
  block?: Block;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(block?.title ?? '');
  const { run, pending, error } = useAction();

  function handleSubmit() {
    if (block) {
      run(() => updateBlock(block.id, { title }), onClose);
      return;
    }
    run(() => createBlock(listId, { title }), onClose);
  }

  return (
    <Modal
      title={block ? 'Editar Bloco' : 'Novo Bloco'}
      submitLabel={block ? 'Atualizar' : 'Adicionar'}
      pending={pending}
      error={error}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <Field label="Nome do bloco">
        <TextInput
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Ex.: Abertura, Encerramento, Bloco 1"
          maxLength={120}
          autoFocus
        />
      </Field>
    </Modal>
  );
}
