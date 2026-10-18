'use client';

import { useEffect } from 'react';
import { logError } from '@/lib/logger';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logError('app.root_render_failed', error, { digest: error.digest });
  }, [error]);

  return (
    <html lang="pt-BR">
      <body style={{ background: '#170903', color: '#fff', fontFamily: 'sans-serif' }}>
        <main
          style={{
            display: 'flex',
            minHeight: '100dvh',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <div style={{ maxWidth: 420, textAlign: 'center' }}>
            <h1 style={{ color: '#fb923c', fontSize: 20 }}>Algo saiu do tom</h1>
            <p style={{ color: 'rgba(255,255,255,.6)', fontSize: 14, lineHeight: 1.6 }}>
              O aplicativo não conseguiu abrir. Recarregue a página em instantes.
            </p>
            <button
              type="button"
              onClick={reset}
              style={{
                marginTop: 16,
                height: 44,
                padding: '0 20px',
                borderRadius: 12,
                border: 0,
                background: '#16a34a',
                color: '#fff',
                fontWeight: 600,
              }}
            >
              Tentar de novo
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
