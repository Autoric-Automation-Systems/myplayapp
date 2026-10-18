export default function Header({ readOnly = false }: { readOnly?: boolean }) {
  return (
    <div className="flex items-center gap-2 border-b border-white/10 py-2 text-[10px] font-semibold uppercase tracking-wider text-orange-400/70 sm:text-xs">
      <div className="flex-1 pl-2 sm:flex-[2]">Título</div>
      <div className="hidden pl-2 sm:block sm:flex-[2]">Artista</div>
      <div className="hidden w-12 text-center sm:block">Tom</div>
      <div className="hidden w-14 text-center sm:block">BPM</div>
      <div className="hidden w-14 text-center md:block">Estilo</div>
      {!readOnly && <div className="w-24 pr-1 text-right sm:w-28 sm:pr-2">Ações</div>}
    </div>
  );
}
