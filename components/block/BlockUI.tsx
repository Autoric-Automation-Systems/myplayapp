import { useState } from "react";
import type { Block, Music } from "../../types";
import { useStore } from "../../store/useStore";
import MusicModal from "../music/MusicModal";
type Props = {
    repId: string;
    block: Block;
};

export default function BlockUI({ repId, block }: Props) {
    const {
        addMusic,
        deleteMusic,
        updateMusic,
        copyMusic,
        pasteMusic,
    } = useStore();

    const [filter, setFilter] = useState("");
    const [editing, setEditing] = useState<Music | null>(null);
    const [creating, setCreating] = useState(false);

    // filtro por título (pode expandir depois)
    const filtered = block.musics.filter((m) =>
        m.title.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="bg-gray-200 p-3 rounded shadow">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold">{block.name}</h3>

                <div className="flex gap-2">
                    <button
                        className="bg-green-500 text-white px-2 rounded"
                        onClick={() => setCreating(true)}
                    >
                        + Música
                    </button>

                    <button
                        className="bg-gray-500 text-white px-2 rounded"
                        onClick={() => pasteMusic(repId, block.id)}
                        title="Colar música"
                    >
                        📋
                    </button>
                </div>
            </div>

            {/* Filtro */}
            <input
                className="w-full p-1 mb-2 border rounded"
                placeholder="Filtrar por título..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />

            {/* Lista */}
            <div className="space-y-2">
                {filtered.map((m) => (
                    <div
                        key={m.id}
                        className="bg-white p-2 rounded flex justify-between items-center"
                    >
                        <div>
                            <div className="font-medium">{m.title}</div>
                            <div className="text-xs text-gray-500">
                                {m.artist} | {m.key} | {m.bpm}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setEditing(m)}
                                title="Editar"
                            >
                                ✏️
                            </button>

                            <button
                                onClick={() => copyMusic(m)}
                                title="Copiar"
                            >
                                📄
                            </button>

                            <button
                                onClick={() => {
                                    if (confirm("Excluir música?")) {
                                        deleteMusic(repId, block.id, m.id);
                                    }
                                }}
                                title="Excluir"
                            >
                                ❌
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal criação */}
            {creating && (
                <MusicModal
                    onClose={() => setCreating(false)}
                    onSave={(music) => {
                        addMusic(repId, block.id, music);
                        setCreating(false);
                    }}
                />
            )}

            {/* Modal edição */}
            {editing && (
                <MusicModal
                    initial={editing}
                    onClose={() => setEditing(null)}
                    onSave={(music) => {
                        updateMusic(repId, block.id, music);
                        setEditing(null);
                    }}
                />
            )}
        </div>
    );
}