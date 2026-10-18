import type { MetadataRoute } from 'next';
import infoAPP from '@/lib/infoapp';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Área autenticada e links de repertório (podem conter letras e nome de cliente).
        disallow: ['/dashboard', '/list/', '/profile', '/view/', '/api/'],
      },
    ],
    sitemap: new URL('/sitemap.xml', infoAPP.site).toString(),
    host: infoAPP.site,
  };
}
