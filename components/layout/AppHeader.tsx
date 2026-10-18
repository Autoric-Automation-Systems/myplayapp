import Image from 'next/image';
import Link from 'next/link';
import { getCurrentUser } from '@/server/session';
import LogoutButton from './LogoutButton';

export default async function AppHeader() {
  const user = await getCurrentUser();
  if (!user) return null;

  return (
    <header className="sticky top-0 z-30 border-b border-orange-900/30 bg-surface-deep/95 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-2 px-3 sm:h-16 sm:px-4">
        <Link href="/dashboard" aria-label="Ir para o dashboard" className="flex items-center">
          <Image
            src="/logo.png"
            alt="MyPlayApp"
            width={120}
            height={120}
            className="h-9 w-auto sm:h-11"
            loading="eager"
          />
        </Link>

        <div className="ml-auto flex items-center">
          <LogoutButton user={user} />
        </div>
      </div>
    </header>
  );
}
