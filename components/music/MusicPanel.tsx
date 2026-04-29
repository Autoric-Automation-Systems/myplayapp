import { useState } from "react";
import type { Music } from "../../types";

interface MusicPanelProps {
    music: Music | null;
    onClose?: () => void;
}

export default function MusicPanel({ music, onClose }: MusicPanelProps) {
    const [font, setFont] = useState(16);

    if (!music) {
        return (
            <div className="h-full bg-[#3a1707] p-6 flex flex-col items-center justify-center text-white/40">
                <span className="text-5xl mb-4">🎵</span>
                <p className="text-lg font-medium">Selecione uma música</p>
                <p className="text-sm mt-2">Clique no 👁️ para ver os detalhes</p>
            </div>
        );
    }

    return (
        <div className="h-full bg-[#3a1707] p-6 overflow-auto">
            {/* Cabeçalho */}
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-orange-900/30">
                <div>
                    <h2 className="text-2xl font-bold text-orange-400 leading-tight">{music.title}</h2>
                    {music.artist && (
                        <p className="text-sm text-white/50 mt-1">{music.artist}</p>
                    )}
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition"
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* Tags */}
            <div className="flex gap-2 mb-6 flex-wrap">
                <span className="bg-orange-800/50 text-orange-300 px-3 py-1 rounded-lg text-sm font-medium">
                    {music.key}
                </span>
                <span className="bg-cyan-800/50 text-cyan-300 px-3 py-1 rounded-lg text-sm font-mono font-medium">
                    {music.bpm} BPM
                </span>
                <span className="bg-purple-800/50 text-purple-300 px-3 py-1 rounded-lg text-sm font-medium">
                    {music.style}
                </span>
            </div>

            {/* Controles de fonte */}
            <div className="flex items-center gap-3 mb-6 p-3 bg-black/20 rounded-xl">
                <span className="text-xs text-white/40 uppercase tracking-wider font-medium">Tamanho</span>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setFont(prev => Math.max(prev - 2, 10))}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition text-sm font-medium"
                        disabled={font <= 10}
                    >
                        A-
                    </button>
                    <span className="w-12 text-center text-sm text-white/60 font-mono">{font}px</span>
                    <button
                        onClick={() => setFont(prev => Math.min(prev + 2, 32))}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition text-sm font-medium"
                        disabled={font >= 32}
                    >
                        A+
                    </button>
                </div>
            </div>

            {/* Letra */}
            <div className="bg-black/30 rounded-xl p-6 border border-white/5">
                {music.lyrics ? (
                    <pre
                        className="whitespace-pre-wrap font-sans text-white/90 leading-relaxed"
                        style={{ fontSize: `${font}px` }}
                    >
                        {music.lyrics}
                    </pre>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-white/30">
                        <span className="text-3xl mb-3">📝</span>
                        <p className="text-sm">Nenhuma letra disponível</p>
                    </div>
                )}
            </div>
        </div>
    );
}

