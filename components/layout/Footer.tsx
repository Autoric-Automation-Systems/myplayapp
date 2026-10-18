import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-orange-900/30 bg-surface">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-2 px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-center sm:flex-row sm:gap-4 sm:px-4 sm:py-2 sm:text-left">
        <Link href="/" className="flex shrink-0 items-center" aria-label="MyPlayApp">
          <Image
            src="/logo.png"
            alt="MyPlayApp"
            width={120}
            height={120}
            className="h-8 w-auto sm:h-10"
          />
        </Link>

        <span className="text-[11px] text-orange-200/60 sm:ml-auto sm:text-xs">
          &copy; {new Date().getFullYear()} MyPlayApp
        </span>

        <nav className="flex items-center gap-4 sm:gap-5">
          <Link
            href="/sobre"
            className="text-[11px] text-orange-200/70 transition-colors hover:text-orange-200 sm:text-xs"
          >
            Sobre
          </Link>
          <Link
            href="/appservice"
            className="text-[11px] text-orange-200/70 transition-colors hover:text-orange-200 sm:text-xs"
          >
            Termos de Serviço
          </Link>
          <Link
            href="/privacy"
            className="text-[11px] text-orange-200/70 transition-colors hover:text-orange-200 sm:text-xs"
          >
            Política de Privacidade
          </Link>
        </nav>
      </div>
    </footer>
  );
}
