import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60dvh] items-center justify-center p-6 text-white">
      <div className="w-full max-w-md space-y-4 text-center">
        <p className="text-[10px] font-medium uppercase tracking-wider text-orange-400/70">
          Erro 404
        </p>
        <h1 className="text-xl font-bold text-orange-400">Esse repertório não está aqui</h1>
        <p className="text-sm text-white/60">
          O link pode ter sido removido, ou o repertório deixou de ser público.
        </p>
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white"
        >
          Ir para o início
        </Link>
      </div>
    </div>
  );
}
