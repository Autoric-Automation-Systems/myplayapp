export default function Header() {
    return (
        <div className="flex items-center gap-2 py-2 border-b border-white/10 text-[10px] sm:text-xs font-semibold text-orange-400/70 uppercase tracking-wider">
            <div className="flex-1 sm:flex-[2] pl-2">Título</div>
            <div className="hidden sm:block sm:flex-[2] pl-2">Artista</div>
            <div className="w-10 sm:w-12 text-center">Tom</div>
            <div className="w-12 sm:w-14 text-center">BPM</div>
            <div className="w-14 text-center hidden md:block">Estilo</div>
            <div className="w-20 sm:w-28 text-right pr-2">Ações</div>
        </div>
    );
}