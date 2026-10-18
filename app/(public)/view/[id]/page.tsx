import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import PublicRepertoire from '@/components/list/PublicRepertoire';
import { getPublicListDetail } from '@/server/services/repertoire';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params;
  const detail = await getPublicListDetail(id);

  if (!detail) {
    return { title: 'Repertório não encontrado' };
  }

  const trackCount = detail.blocks.reduce((total, block) => total + block.tracks.length, 0);
  const title = detail.list.title;
  const description = detail.owner
    ? `Repertório de ${detail.owner.name} para o show: ${detail.blocks.length} bloco(s) e ${trackCount} música(s).`
    : `Repertório para o show: ${detail.blocks.length} bloco(s) e ${trackCount} música(s).`;

  // openGraph do layout não é herdado automaticamente: preserva imagem, site e locale.
  const { openGraph } = await parent;

  return {
    title,
    description,
    openGraph: {
      ...openGraph,
      type: 'article',
      title,
      description,
      url: `/view/${id}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const detail = await getPublicListDetail(id);
  if (!detail) notFound();

  return <PublicRepertoire detail={detail} />;
}
