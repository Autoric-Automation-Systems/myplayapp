import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PublicRepertoire from '@/components/list/PublicRepertoire';
import { getPublicListDetail } from '@/server/services/repertoire';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const detail = await getPublicListDetail(id);

  const ownerName = detail?.owner?.name;

  return {
    title: detail ? detail.list.title : 'Repertório não encontrado',
    description: detail
      ? `Repertório de ${ownerName ?? 'um músico'} com ${detail.blocks.length} bloco(s) no MyPlayApp.`
      : undefined,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const detail = await getPublicListDetail(id);
  if (!detail) notFound();

  return <PublicRepertoire detail={detail} />;
}
