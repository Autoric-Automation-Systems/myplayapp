import infoAPP from "@/lib/infoapp";
import Link from "next/link";

export default function InfoCard() {
    return (
        <div className="p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 space-y-4">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-orange-400 leading-tight">Informações Sobre o App</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{infoAPP.name}</p>
            </div>
            <div className="space-y-3">
                <div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90">Descrição</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{infoAPP.description}</p>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90">Versão</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{infoAPP.version}</p>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90">Desenvolvido por</h3>
                    <Link
                        href={infoAPP.developer}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-orange-500 hover:text-orange-400 hover:underline mt-1 inline-block"
                    >
                        {infoAPP.developer}
                    </Link>
                </div>
            </div>
        </div>
    );
}