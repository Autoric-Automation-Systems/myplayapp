import Image from 'next/image';
import Link from 'next/link';
import Blocks from '@/components/block/Blocks';
import MessageBoundary from '@/components/ui/MessageBoundary';
import type { PublicListDetail } from '@/server/types';

export default function PublicRepertoire({ detail }: { detail: PublicListDetail }) {
  const trackCount = detail.blocks.reduce((total, block) => total + block.tracks.length, 0);

  return (
    <div className="flex-1 bg-gradient-to-b from-surface-deep to-[#170903] text-white">
      <div className="mx-auto w-full max-w-7xl p-3 pb-8 sm:p-6">
        <MessageBoundary />

        <header className="mb-5 space-y-3 sm:mb-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] font-medium uppercase tracking-wider text-orange-400/70 sm:text-xs">
              Repertório público
            </p>
            <Link
              href="/"
              className="shrink-0 rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/70 transition hover:border-white/20 hover:text-white sm:text-xs"
            >
              MyPlayApp
            </Link>
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-bold leading-tight text-orange-400 sm:text-3xl">
              {detail.list.title}
            </h1>
            <p className="mt-1 text-xs text-white/50 sm:text-sm">
              {detail.blocks.length} bloco{detail.blocks.length !== 1 ? 's' : ''} · {trackCount}{' '}
              música{trackCount !== 1 ? 's' : ''}
            </p>
          </div>

          {detail.owner && (
            <div className="flex items-center gap-2 pt-1">
              <Image
                src={detail.owner.picture ?? '/logo.png'}
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 shrink-0 rounded-full border border-white/10 object-cover"
              />
              <p className="min-w-0 truncate text-xs text-white/60 sm:text-sm">
                Repertório de{' '}
                <span className="font-medium text-white/90">{detail.owner.name}</span>
              </p>
            </div>
          )}
        </header>

        <Blocks blocks={detail.blocks} readOnly />

        <section className="mt-8 rounded-xl border border-orange-900/40 bg-surface/60 p-4 text-center sm:p-6">
          <p className="text-sm text-white/70">Quer montar o seu repertório?</p>
          <Link
            href="/login"
            className="mt-3 inline-flex h-11 items-center justify-center rounded-xl bg-green-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-green-500"
          >
            Criar minha conta
          </Link>
        </section>
      </div>
    </div>
  );
}
