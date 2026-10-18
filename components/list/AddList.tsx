'use client';

import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { IconButton } from '@/components/ui/Button';
import ListFormModal from './ListFormModal';

export default function AddList() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        label="Novo repertório"
        size="lg"
        icon={<PlusIcon className="h-7 w-7" />}
        onClick={() => setOpen(true)}
      />
      {open && <ListFormModal onClose={() => setOpen(false)} />}
    </>
  );
}
