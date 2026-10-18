import type { Metadata, ResolvingMetadata } from 'next';
import infoAPP from '@/lib/infoapp';

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  parent: ResolvingMetadata;
  type?: 'website' | 'article';
  index?: boolean;
};

/**
 * `openGraph` de uma página substitui o do layout por inteiro — inclusive a imagem
 * gerada por `app/opengraph-image.png`. Herdar do pai evita link sem preview.
 */
export async function pageMetadata({
  title,
  description,
  path,
  parent,
  type = 'website',
  index = true,
}: PageMetadataInput): Promise<Metadata> {
  const { openGraph } = await parent;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: index ? undefined : { index: false, follow: true },
    openGraph: {
      ...openGraph,
      type,
      title,
      description,
      url: path,
      siteName: infoAPP.name,
    },
  };
}
