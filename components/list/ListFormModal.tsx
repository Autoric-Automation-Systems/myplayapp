'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { Field, TextInput, Toggle } from '@/components/ui/form';
import { useAction } from '@/components/ui/useAction';
import { createList, updateList } from '@/server/actions/lists';
import type { List } from '@/server/types';

export default function ListFormModal({
  list,
  onClose,
}: {
  list?: List;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(list?.title ?? '');
  const [isPublic, setIsPublic] = useState(list?.is_public ?? false);
  const { run, pending, error } = useAction();

  function handleSubmit() {
    if (list) {
      run(() => updateList(list.id, { title, is_public: isPublic }), onClose);
      return;
    }
    run(() => createList({ title }), onClose);
  }

  return (
    <Modal
      title={list ? 'Editar Repertório' : 'Novo Repertório'}
      submitLabel={list ? 'Atualizar' : 'Adicionar'}
      pending={pending}
      error={error}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <Field label="Nome do repertório">
        <TextInput
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Nome do repertório"
          maxLength={120}
          autoFocus
        />
      </Field>

      {list && (
        <Toggle
          checked={isPublic}
          onChange={setIsPublic}
          label="Repertório público"
          description="Qualquer pessoa com o link pode visualizar."
        />
      )}
    </Modal>
  );
}
