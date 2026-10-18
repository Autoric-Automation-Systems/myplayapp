import type { NextRequest } from 'next/server';
import { auth } from '@/server/auth';

// Next exige um export de função estático em proxy.ts; o Auth.js aceita a
// requisição em tempo de execução, mas não declara essa assinatura nos tipos.
const authorize = auth as unknown as (request: NextRequest) => Promise<Response | undefined>;

export default function proxy(request: NextRequest) {
  return authorize(request);
}

export const config = {
  matcher: ['/dashboard/:path*', '/list/:path*', '/profile/:path*', '/infoApp/:path*'],
};
