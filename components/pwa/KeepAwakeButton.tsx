'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

type WakeLockSentinel = {
  release: () => Promise<void>;
  addEventListener: (event: 'release', listener: () => void) => void;
};

type NavigatorWithWakeLock = Navigator & {
  wakeLock?: { request: (type: 'screen') => Promise<WakeLockSentinel> };
};

const noopSubscribe = () => () => {};

/**
 * Mantém a tela acesa durante o show. O navegador solta o lock ao trocar de aba,
 * então readquirimos no `visibilitychange`.
 */
export default function KeepAwakeButton() {
  // Capacidade vem do navegador, não do render do servidor: evita erro de hidratação.
  const supported = useSyncExternalStore(
    noopSubscribe,
    () => 'wakeLock' in navigator,
    () => false,
  );
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;

    const wakeLock = (navigator as NavigatorWithWakeLock).wakeLock;
    if (!wakeLock) return;

    let sentinel: WakeLockSentinel | null = null;
    let cancelled = false;

    async function acquire() {
      if (cancelled) return;
      try {
        sentinel = await wakeLock.request('screen');
        sentinel.addEventListener('release', () => {
          if (!cancelled) setActive(false);
        });
      } catch {
        if (!cancelled) setActive(false);
      }
    }

    function onVisibility() {
      if (document.visibilityState === 'visible') void acquire();
    }

    void acquire();
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisibility);
      void sentinel?.release();
    };
  }, [active]);

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={() => setActive((value) => !value)}
      aria-pressed={active}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] transition sm:text-xs ${
        active
          ? 'border-orange-400/60 bg-orange-500/15 text-orange-300'
          : 'border-white/10 text-white/60 hover:border-white/20 hover:text-white'
      }`}
    >
      <span aria-hidden>{active ? '🔆' : '🌙'}</span>
      {active ? 'Tela acesa' : 'Manter acesa'}
    </button>
  );
}
