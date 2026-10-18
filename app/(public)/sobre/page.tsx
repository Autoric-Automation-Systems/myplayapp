import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import InfoCard from '@/components/info/InfoCard';
import PixCard from '@/components/pix/PixCard';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata(
  _props: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return pageMetadata({
    title: 'Sobre o app',
    description: 'O que é o MyPlayApp, quem desenvolve e como apoiar o projeto com um Pix.',
    path: '/sobre',
    parent,
  });
}

export default function SobrePage() {
  return (
    <div className="flex-1 bg-gradient-to-b from-surface-deep to-[#170903] text-white">
      <div className="mx-auto w-full max-w-2xl space-y-6 p-3 sm:p-6">
        <header>
          <Link
            href="/"
            className="text-[11px] font-medium uppercase tracking-wider text-orange-400/70 transition hover:text-orange-300 sm:text-xs"
          >
            MyPlayApp
          </Link>
        </header>

        <InfoCard />
        <PixCard />

        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 pb-4 text-xs text-white/50">
          <Link href="/appservice" className="hover:text-white/80">
            Termos de Serviço
          </Link>
          <Link href="/privacy" className="hover:text-white/80">
            Política de Privacidade
          </Link>
        </nav>
      </div>
    </div>
  );
}
