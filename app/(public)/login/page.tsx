import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/server/session';
import LoginCard from './LoginCard';

export default async function Page() {
  const user = await getCurrentUser();
  if (user) redirect('/dashboard');

  return (
    <div className="flex min-h-[calc(100dvh-7rem)] flex-col items-center justify-center gap-6 bg-gradient-to-b from-surface-deep to-[#170903] px-5 py-10 text-white">
      <Link href="/" aria-label="MyPlayApp">
        <Image
          width={500}
          height={500}
          src="/logo.png"
          alt="MyPlayApp"
          className="h-auto w-52 sm:w-72"
          loading="eager"
        />
      </Link>

      <div className="w-full max-w-xs space-y-4">
        <LoginCard />
        <p className="text-center text-xs leading-relaxed text-white/40">
          Ao entrar você concorda com os{' '}
          <Link href="/appservice" className="text-orange-300/80 underline-offset-2 hover:underline">
            Termos de Serviço
          </Link>{' '}
          e a{' '}
          <Link href="/privacy" className="text-orange-300/80 underline-offset-2 hover:underline">
            Política de Privacidade
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
