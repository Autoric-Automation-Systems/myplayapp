import Image from "next/image";
import Link from "next/link";

export default function Footer() {

    return (
        <footer className="flex items-center p-0 bg-[#3a1707] border-t border-orange-900/30 mt-auto w-full">
            <Link href="/dashboard" className="flex items-center">
                <Image
                    className="mr-2 fill-current h-auto w-auto"
                    src="/logo.png"
                    alt="Logo"
                    width={120}
                    height={120}
                    loading="eager"
                />
            </Link>
            <span className="text-orange-200/50 text-sm ml-auto mr-4">
                &copy; {new Date().getFullYear()} MyPlayApp. Todos os direitos reservados.
            </span>
            <div className="flex gap-4 sm:gap-6 items-center mr-4">
                <Link href="/appservice" className="text-orange-200/70 hover:text-orange-200 text-xs sm:text-sm transition-colors">
                    Termos de Serviço
                </Link>
                <Link href="/privacy" className="text-orange-200/70 hover:text-orange-200 text-xs sm:text-sm transition-colors">
                    Política de Privacidade
                </Link>
            </div>
        </footer>
    )
}