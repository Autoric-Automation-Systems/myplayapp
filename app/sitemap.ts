import type { MetadataRoute } from 'next';
import infoAPP from '@/lib/infoapp';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ['', '/sobre', '/login', '/privacy', '/appservice'].map((path) => ({
    url: new URL(path || '/', infoAPP.site).toString(),
    lastModified,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.5,
  }));
}
