import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto flex w-full flex-wrap items-center gap-3 border-t border-orange-900/30 bg-surface p-2 sm:flex-nowrap">
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

      <span className="ml-auto text-xs text-orange-200/50 sm:text-sm">
        &copy; {new Date().getFullYear()} MyPlayApp. Todos os direitos reservados.
      </span>

      <nav className="mr-2 flex items-center gap-4 sm:gap-6">
        <Link
          href="/appservice"
          className="text-xs text-orange-200/70 transition-colors hover:text-orange-200 sm:text-sm"
        >
          Termos de Serviço
        </Link>
        <Link
          href="/privacy"
          className="text-xs text-orange-200/70 transition-colors hover:text-orange-200 sm:text-sm"
        >
          Política de Privacidade
        </Link>
      </nav>
    </footer>
  );
}
