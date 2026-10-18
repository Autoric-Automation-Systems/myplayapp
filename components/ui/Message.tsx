'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import type { ComponentType, SVGProps } from 'react';

type MessageType = 'success' | 'error' | 'info' | 'warning';

const variants: Record<
  MessageType,
  { className: string; icon: ComponentType<SVGProps<SVGSVGElement>> }
> = {
  success: { className: 'border-green-700/50 bg-green-900/40 text-green-100', icon: CheckCircleIcon },
  error: { className: 'border-red-700/50 bg-red-900/40 text-red-100', icon: XCircleIcon },
  info: { className: 'border-blue-700/50 bg-blue-900/40 text-blue-100', icon: InformationCircleIcon },
  warning: {
    className: 'border-yellow-700/50 bg-yellow-900/40 text-yellow-100',
    icon: ExclamationTriangleIcon,
  },
};

export default function Message() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState<string | null>(null);

  const title = searchParams.get('title');
  const message = searchParams.get('message');
  const type = searchParams.get('type') as MessageType | null;

  if (!title || !message || !type || !(type in variants)) return null;

  const key = `${type}|${title}|${message}`;
  if (dismissed === key) return null;

  const variant = variants[type];
  const Icon = variant.icon;

  function close() {
    setDismissed(key);
    router.replace(pathname, { scroll: false });
  }

  return (
    <div role="status" className={`mb-4 rounded-xl border p-4 md:p-5 ${variant.className}`}>
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-6 w-6 shrink-0" />
        <div className="flex-1">
          <h4 className="mb-1 text-sm font-semibold">{title}</h4>
          <p className="text-sm opacity-90">{message}</p>
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Fechar mensagem"
          className="rounded-lg p-1 transition hover:bg-white/10"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
