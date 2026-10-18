import type { MetadataRoute } from 'next';
import infoAPP from '@/lib/infoapp';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${infoAPP.name} — repertórios prontos para o palco`,
    short_name: infoAPP.name,
    description: infoAPP.tagline,
    start_url: '/dashboard',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#170903',
    theme_color: '#170903',
    lang: 'pt-BR',
    icons: [
      { src: '/icon.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  };
}
