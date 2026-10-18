import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Blocks from '@/components/block/Blocks';
import MessageBoundary from '@/components/ui/MessageBoundary';
import { getPublicListDetail } from '@/server/services/repertoire';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const detail = await getPublicListDetail(id);

  return {
    title: detail ? detail.list.title : 'Repertório não encontrado',
    description: detail
      ? `Repertório público com ${detail.blocks.length} bloco(s) no MyPlayApp.`
      : undefined,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const detail = await getPublicListDetail(id);
  if (!detail) notFound();

  const trackCount = detail.blocks.reduce((total, block) => total + block.tracks.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-deep to-[#1a0a02] text-white">
      <div className="mx-auto max-w-7xl p-3 sm:p-6">
        <MessageBoundary />

        <header className="mb-6 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-wider text-orange-400/70 sm:text-xs">
              Repertório público
            </p>
            <h1 className="truncate text-xl font-bold text-orange-400 sm:text-3xl">
              {detail.list.title}
            </h1>
            <p className="mt-1 text-xs text-white/50 sm:text-sm">
              {detail.blocks.length} bloco{detail.blocks.length !== 1 ? 's' : ''} · {trackCount}{' '}
              música{trackCount !== 1 ? 's' : ''}
            </p>
          </div>

          <Link
            href="/"
            className="shrink-0 rounded-lg bg-white/10 px-4 py-2 text-xs text-white transition hover:bg-white/20 sm:text-sm"
          >
            MyPlayApp
          </Link>
        </header>

        <Blocks blocks={detail.blocks} readOnly />
      </div>
    </div>
  );
}
