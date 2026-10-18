import Image from 'next/image';
import Link from 'next/link';

export default function LandPage() {
  return (
    <div className="relative flex min-h-[calc(100dvh-9rem)] items-center justify-center overflow-hidden bg-gradient-to-b from-surface-deep to-[#1a0a02] text-white">
      <div className="relative z-30 text-center md:ml-0">
        <Link
          href="/login"
          className="transform rounded-lg bg-green-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-700"
        >
          Entrar
        </Link>
      </div>

      <Image
        width={1920}
        height={1080}
        src="/hero.png"
        alt=""
        priority
        className="pointer-events-none absolute inset-0 hidden h-full w-full object-contain opacity-90 md:block"
      />
      <Image
        width={480}
        height={800}
        src="/hero_mobile.png"
        alt=""
        priority
        className="pointer-events-none absolute inset-0 mx-auto block h-full max-h-dvh w-auto object-contain opacity-90 md:hidden"
      />
    </div>
  );
}
