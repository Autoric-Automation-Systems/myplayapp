'use client';

import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

const fieldClass =
  'w-full rounded-lg border border-surface-line/60 bg-surface-deep p-2.5 text-sm text-white placeholder:text-white/30 transition focus:border-green-500 focus:outline-none';

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="mb-3 block">
      <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-orange-300">
        {label}
      </span>
      {children}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className = '', ...rest } = props;
  return <input className={`${fieldClass} ${className}`} {...rest} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  const { className = '', ...rest } = props;
  return <select className={`${fieldClass} ${className}`} {...rest} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className = '', ...rest } = props;
  return <textarea className={`${fieldClass} ${className}`} {...rest} />;
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4 rounded-xl bg-black/20 p-3">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        {description && <p className="mt-0.5 text-xs text-white/40">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-green-500' : 'bg-white/20'
        }`}
      >
        <span
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            checked ? 'translate-x-5' : ''
          }`}
        />
      </button>
    </div>
  );
}
