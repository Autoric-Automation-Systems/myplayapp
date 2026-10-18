import Link from 'next/link';
import infoAPP from '@/lib/infoapp';

export default function InfoCard() {
  return (
    <div className="space-y-4 rounded-xl border border-orange-900/40 bg-surface p-4 sm:p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold leading-tight text-orange-400">
          Informações Sobre o App
        </h2>
        <p className="mt-1 text-sm text-white/50">{infoAPP.name}</p>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-white/90">Descrição</h3>
          <p className="mt-1 text-sm text-white/60">{infoAPP.description}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white/90">Versão</h3>
          <p className="mt-1 text-sm text-white/60">{infoAPP.version}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white/90">Desenvolvido por</h3>
          <Link
            href={infoAPP.developer}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-sm text-orange-400 hover:text-orange-300 hover:underline"
          >
            {infoAPP.developer}
          </Link>
        </div>
      </div>
    </div>
  );
}
