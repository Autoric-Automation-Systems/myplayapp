import Link from 'next/link';
import { ArrowRightIcon, MusicalNoteIcon } from '@heroicons/react/24/outline';
import type { ListSummary } from '@/server/types';

export default function CardList({ list }: { list: ListSummary }) {
  return (
    <Link
      href={`/list/${list.id}`}
      className="group relative block rounded-xl border border-orange-900/40 bg-surface p-3 transition-all hover:border-orange-700/60 hover:shadow-lg hover:shadow-orange-900/20 active:scale-[0.98] sm:p-5"
    >
      <div className="flex items-start gap-2 pr-6 sm:gap-3">
        <MusicalNoteIcon className="h-8 w-8 shrink-0 text-orange-400" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-white sm:text-lg">{list.title}</h3>
          <p className="mt-0.5 text-xs text-white/50 sm:mt-1 sm:text-sm">
            {list.block_count} bloco{list.block_count !== 1 ? 's' : ''}
          </p>
          {!list.is_public && (
            <p className="mt-1 text-[10px] uppercase tracking-wider text-white/45">Privado</p>
          )}
        </div>
      </div>

      <ArrowRightIcon className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-orange-400/60 sm:right-4" />
    </Link>
  );
}
