'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';

export type DropdownItem = {
  label: string;
  icon: ReactNode;
  onSelect?: () => void;
  href?: string;
  danger?: boolean;
};

export default function DropdownMenu({
  label,
  trigger,
  items,
}: {
  label: string;
  trigger: ReactNode;
  items: DropdownItem[];
}) {
  const [open, setOpen] = useState(false);

  const itemClass = (danger?: boolean) =>
    `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/10 ${
      danger ? 'text-red-300' : ''
    }`;

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        className="rounded-lg p-2 transition hover:bg-white/10"
      >
        {trigger}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            role="menu"
            className="absolute right-0 z-50 mt-2 flex w-52 flex-col gap-0.5 rounded-xl border border-white/10 bg-surface p-1 text-white shadow-2xl"
          >
            {items.map((item) =>
              item.href ? (
                <Link
                  key={item.label}
                  href={item.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className={itemClass(item.danger)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <button
                  key={item.label}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setOpen(false);
                    item.onSelect?.();
                  }}
                  className={itemClass(item.danger)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}
