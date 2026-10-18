import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import PublicRepertoire from '@/components/list/PublicRepertoire';
import { pageMetadata } from '@/lib/seo';
import { getPublicListDetail } from '@/server/services/repertoire';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params;
  const detail = await getPublicListDetail(id);

  if (!detail) {
    return { title: 'Repertório não encontrado', robots: { index: false, follow: false } };
  }

  const trackCount = detail.blocks.reduce((total, block) => total + block.tracks.length, 0);
  const description = detail.owner
    ? `Repertório de ${detail.owner.name} para o show: ${detail.blocks.length} bloco(s) e ${trackCount} música(s).`
    : `Repertório para o show: ${detail.blocks.length} bloco(s) e ${trackCount} música(s).`;

  return pageMetadata({
    title: detail.list.title,
    description,
    path: `/view/${id}`,
    parent,
    type: 'article',
    // O link é compartilhável, mas letras e nomes de cliente não devem ir para buscadores.
    index: false,
  });
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const detail = await getPublicListDetail(id);
  if (!detail) notFound();

  return <PublicRepertoire detail={detail} />;
}
