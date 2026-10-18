import Image from 'next/image';
import Link from 'next/link';
import { getCurrentUser } from '@/server/session';
import LogoutButton from './LogoutButton';

export default async function Header() {
  const user = await getCurrentUser();
  if (!user) return null;

  return (
    <header className="flex items-center bg-surface p-2">
      <Link href="/dashboard" className="flex items-center">
        <Image
          src="/logo.png"
          alt="MyPlayApp"
          width={120}
          height={120}
          className="h-auto w-auto"
          loading="eager"
        />
      </Link>
      <div className="ml-auto flex items-center pr-2">
        <LogoutButton user={user} />
      </div>
    </header>
  );
}
