import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      // A tela Sobre era privada (/infoApp) e havia um /info vazio: agora é uma só, pública.
      { source: '/infoApp', destination: '/sobre', permanent: true },
      { source: '/info', destination: '/sobre', permanent: true },
    ];
  },
};

export default nextConfig;
