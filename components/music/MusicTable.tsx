import { useStore } from "../../store/useStore";
import type { Music } from "../../types";


export default function MusicTable({ onSelect }: { onSelect: (m: Music) => void }) {
    const { repertoires } = useStore();
    const rep = repertoires[0]; // simplificado

    return (
        <div className="flex-1 overflow-auto">
            {/* HEADER */}
            <div className="grid grid-cols-7 px-4 py-2 text-orange-400 text-sm border-b border-orange-900">
                <div>#</div>
                <div>TÍTULO</div>
                <div>TOM</div>
                <div>BPM</div>
                <div>ESTILO</div>
                <div>ARTISTA</div>
                <div>LETRA</div>
            </div>

            {/* LINHAS */}
            {rep?.blocks.flatMap((b) => b.musics).map((m, i) => (
                <div
                    key={m.id}
                    onClick={() => onSelect(m)}
                    className="grid grid-cols-7 px-4 py-2 text-sm border-b border-orange-950 hover:bg-orange-900/30 cursor-pointer"
                >
                    <div>{i + 1}</div>
                    <div className="font-semibold">{m.title}</div>

                    {/* TOM */}
                    <div>
                        <span className="border border-green-500 px-2 rounded text-green-400">
                            {m.key}
                        </span>
                    </div>

                    <div className="text-cyan-400">{m.bpm}</div>

                    {/* ESTILO */}
                    <div>
                        <span className="bg-purple-700 px-2 rounded text-xs">
                            {m.style}
                        </span>
                    </div>

                    <div className="text-gray-400">{m.artist || "-"}</div>

                    <div>📄</div>
                </div>
            ))}
        </div>
    );
}