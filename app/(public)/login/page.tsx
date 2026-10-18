import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/server/session';
import LoginCard from './LoginCard';

export default async function Page() {
  const user = await getCurrentUser();
  if (user) redirect('/dashboard');

  return (
    <div className="flex min-h-[calc(100dvh-9rem)] flex-col items-center justify-center bg-gradient-to-b from-surface-deep to-[#1a0a02] text-white">
      <Link href="/">
        <Image
          width={500}
          height={500}
          src="/logo.png"
          alt="MyPlayApp"
          className="w-84"
          loading="eager"
        />
      </Link>
      <LoginCard />
    </div>
  );
}
