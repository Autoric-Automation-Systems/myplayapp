import { useState } from "react";
import type { Track } from "@/query/tracks/definitions";

const NOTAS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",
    "Cm", "C#m", "Dm", "D#m", "Em", "Fm", "F#m", "Gm", "G#m", "Am", "A#m", "Bm",
];

const ESTILOS = ["Rock", "Pop", "Jazz", "Blues", "Funk",
    "Samba", "Bossa Nova", "MPB", "Forró", "Gospel",
    "Outro", "Pagode", "Axé", "Sertanejo", "Reggae",
    "Xote", "Frevo", "Maracatu", "Lambada", "Carimbó",
    "Choro", "Tango", "Salsa", "Merengue", "Cumbia",
    "Fado", "Flamenco", "Bolero", "Valsa", "Zouk",
    "Lounge", "Eletrônica", "Clássica", "Trance",
    "House", "Techno", "Dubstep", "Drum and Bass",
    "Trap", "Hip Hop", "Rap", "R&B", "Soul"
];

export default function Modal({
    initial,
    onSave,
    onClose,
}: {
    initial?: Track;
    onSave: (m: Track) => void;
    onClose: () => void;
}) {
    const [m, setM] = useState<Track>(
        initial || {
            id: "",
            block_id: "",
            title: "",
            key: "",
            bpm: 100,
            style: "",
            artist: "",
            lyrics: "",
        }
    );

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-3 sm:p-0">
            <div className="bg-[#3a1707] p-4 sm:p-6 w-full sm:w-[480px] mx-0 sm:mx-auto rounded-2xl shadow-2xl border border-orange-900 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-2xl font-bold text-orange-400">
                        {initial ? "Editar Música" : "Nova Música"}
                    </h2>
                    <button onClick={onClose} className="text-white/50 hover:text-white transition text-xl">✕</button>
                </div>

                <div className="mb-3">
                    <label className="block text-xs sm:text-sm text-orange-300 mb-1 uppercase tracking-wider">Título</label>
                    <input
                        className="w-full p-2 sm:p-2.5 rounded-lg bg-[#2b1205] border border-orange-900 text-white placeholder:text-white/30 focus:outline-none focus:border-green-500 transition text-sm"
                        placeholder="Título"
                        value={m.title}
                        onChange={(e) => setM({ ...m, title: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-xs sm:text-sm text-orange-300 mb-1 uppercase tracking-wider">Artista</label>
                    <input
                        className="w-full p-2 sm:p-2.5 rounded-lg bg-[#2b1205] border border-orange-900 text-white placeholder:text-white/30 focus:outline-none focus:border-green-500 transition text-sm"
                        placeholder="Artista"
                        value={m.artist}
                        onChange={(e) => setM({ ...m, artist: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3">
                    <div>
                        <label className="block text-xs sm:text-sm text-orange-300 mb-1 uppercase tracking-wider">Tom</label>
                        <select
                            className="w-full p-2 sm:p-2.5 rounded-lg bg-[#2b1205] border border-orange-900 text-white focus:outline-none focus:border-green-500 transition text-sm"
                            value={m.key}
                            onChange={(e) => setM({ ...m, key: e.target.value })}
                        >
                            <option value="">-</option>
                            {NOTAS.map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm text-orange-300 mb-1 uppercase tracking-wider">BPM</label>
                        <input
                            type="range"
                            min={50}
                            max={150}
                            value={m.bpm}
                            onChange={(e) => setM({ ...m, bpm: parseInt(e.target.value) })}
                            className="w-full accent-green-500"
                        />
                        <div className="text-center text-cyan-400 font-mono text-xs sm:text-sm mt-0.5">{m.bpm}</div>
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm text-orange-300 mb-1 uppercase tracking-wider">Estilo</label>
                        <select
                            className="w-full p-2 sm:p-2.5 rounded-lg bg-[#2b1205] border border-orange-900 text-white focus:outline-none focus:border-green-500 transition text-sm"
                            value={m.style}
                            onChange={(e) => setM({ ...m, style: e.target.value })}
                        >
                            <option value="">-</option>
                            {ESTILOS.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-xs sm:text-sm text-orange-300 mb-1 uppercase tracking-wider">Letra</label>
                    <textarea
                        className="w-full p-2 sm:p-2.5 rounded-lg bg-[#2b1205] border border-orange-900 text-white placeholder:text-white/30 focus:outline-none focus:border-green-500 transition h-28 sm:h-40 resize-vertical text-sm"
                        placeholder="Digite a letra da música..."
                        value={m.lyrics}
                        onChange={(e) => setM({ ...m, lyrics: e.target.value })}
                    />
                </div>

                <div className="flex justify-end gap-3 pt-3 sm:pt-4 border-t border-orange-900">
                    <button onClick={onClose} className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition text-sm">
                        Cancelar
                    </button>
                    <button
                        className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-semibold text-sm"
                        onClick={() => onSave(m)}
                    >
                        {initial ? "Atualizar" : "Adicionar"}
                    </button>
                </div>
            </div>
        </div>
    );
}
