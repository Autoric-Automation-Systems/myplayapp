'use client';

import { useState } from 'react';
import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline';

export default function CopyPixButton({ payload }: { payload: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-orange-700/60 px-4 text-sm font-medium text-orange-200 transition-colors hover:border-orange-500 hover:bg-orange-950/50 sm:w-auto"
    >
      {copied ? <CheckIcon className="h-4 w-4" /> : <ClipboardIcon className="h-4 w-4" />}
      {copied ? 'Código copiado' : 'Copiar código Pix'}
    </button>
  );
}
