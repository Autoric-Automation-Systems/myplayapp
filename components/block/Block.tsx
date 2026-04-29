import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import type { Block, Music } from "../../types";
import { useStore } from "../../store/useStore";
import MusicRow from "../music/MusicRow";
import MusicModal from "../music/MusicModal";
import Modal from "./Modal";

interface BlockProps {
    block: Block;
    repId: string;
    onSelect: (m: Music | null) => void;
}

export default function Block({ block, repId, onSelect }: BlockProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: block.id,
    });
    const { addMusic, deleteMusic, deleteBlock, updateBlock, updateMusic } = useStore();
    const [showModal, setShowModal] = useState(false);
    const [showMusicModal, setShowMusicModal] = useState(false);
    const [editing, setEditing] = useState<Music | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    function handleMusicClick(music: Music) {
        onSelect(music);
    }

    function handleDeleteMusic(musicId: string) {
        if (confirm("Remover esta música do bloco?")) {
            deleteMusic(repId, block.id, musicId);
        }
    }

    function handleDeleteBlock() {
        if (confirm("Remover este bloco do repertório?")) {
            deleteBlock(repId, block.id);
        }
    }

    return (
        <div
            ref={setNodeRef}
            className={`rounded-xl border-2 p-2 sm:p-4 transition-all duration-200 ${isOver
                    ? "bg-orange-900/30 border-orange-500 shadow-lg shadow-orange-900/20"
                    : "bg-[#3a1707] border-orange-900/40 hover:border-orange-700/60"
                }`}
        >
            {/* Header do bloco */}
            <div className="flex items-center justify-between mb-2 sm:mb-4 pb-2 sm:pb-3 border-b border-orange-900/30">
                <h2 className="text-orange-400 font-bold text-sm sm:text-lg truncate">
                    {block.name}
                </h2>

                {/* Desktop buttons */}
                <div className="hidden sm:flex items-center gap-1.5">
                    <button
                        title="Adicionar Musica"
                        onClick={() => { setEditing(null); setShowMusicModal(true); }}
                        className="flex items-center gap-1 bg-green-600 hover:bg-green-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-sm font-medium transition-all"
                    >
                        <span className="text-base sm:text-lg leading-none">+</span>
                        <span>Música</span>
                    </button>
                    <button
                        title="Editar Bloco"
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 hover:bg-blue-500 text-white p-1 sm:p-1.5 rounded-lg text-xs sm:text-sm transition-all"
                    >
                        ✎
                    </button>
                    <button
                        title="Remover Bloco"
                        onClick={handleDeleteBlock}
                        className="bg-red-600 hover:bg-red-500 text-white p-1 sm:p-1.5 rounded-lg text-xs sm:text-sm transition-all"
                    >
                        ✕
                    </button>
                </div>

                {/* Mobile menu */}
                <div className="sm:hidden relative">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="bg-white/10 hover:bg-white/20 text-white p-1.5 rounded-lg text-sm"
                    >
                        ⋯
                    </button>
                    {menuOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                            <div className="absolute right-0 mt-1 w-36 bg-[#2b1205] rounded-xl shadow-2xl border border-white/10 z-50 overflow-hidden">
                                <button
                                    onClick={() => { setEditing(null); setShowMusicModal(true); setMenuOpen(false); }}
                                    className="w-full text-left px-3 py-2.5 hover:bg-white/10 text-white text-xs flex items-center gap-2"
                                >
                                    <span className="text-green-400">+</span> Add Música
                                </button>
                                <button
                                    onClick={() => { setShowModal(true); setMenuOpen(false); }}
                                    className="w-full text-left px-3 py-2.5 hover:bg-white/10 text-white text-xs flex items-center gap-2"
                                >
                                    <span className="text-blue-400">✎</span> Editar
                                </button>
                                <button
                                    onClick={() => { handleDeleteBlock(); setMenuOpen(false); }}
                                    className="w-full text-left px-3 py-2.5 hover:bg-white/10 text-red-400 text-xs flex items-center gap-2"
                                >
                                    ✕ Excluir
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Header colunas - desktop only */}
            <div className="hidden sm:flex text-[10px] sm:text-xs font-semibold text-orange-400/70 uppercase tracking-wider mb-1 sm:mb-2 px-2">
                <div className="flex-1">Título</div>
                <div className="w-12 text-center">Tom</div>
                <div className="w-14 text-center">BPM</div>
                <div className="w-16 text-center hidden md:block">Estilo</div>
                <div className="w-28 text-right">Ações</div>
            </div>

            {/* Musicas */}
            <SortableContext
                items={block.musics.map((m) => `${m.id}|${block.id}`)}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-0.5 sm:space-y-1.5">
                    {block.musics.length > 0 ? (
                        block.musics.map((m) => (
                            <MusicRow
                                key={m.id}
                                music={m}
                                blockId={block.id}
                                onClick={() => handleMusicClick(m)}
                                onDelete={() => handleDeleteMusic(m.id)}
                                onEdit={() => { setEditing(m); setShowMusicModal(true); }}
                            />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-6 sm:py-10 text-white/30">
                            <span className="text-2xl sm:text-3xl mb-1 sm:mb-2">🎵</span>
                            <p className="text-xs sm:text-sm">Nenhuma música neste bloco</p>
                            <p className="text-[10px] sm:text-xs mt-0.5 sm:mt-1">Clique em "+ Música" para adicionar</p>
                        </div>
                    )}
                </div>
            </SortableContext>

            {showModal && (
                <Modal
                    initial={block}
                    onClose={() => setShowModal(false)}
                    onSave={(block) => { updateBlock(repId, block); setShowModal(false); }}
                />
            )}
            {showMusicModal && (
                <MusicModal
                    initial={editing || undefined}
                    onClose={() => { setShowMusicModal(false); setEditing(null); }}
                    onSave={(music) => {
                        if (editing) updateMusic(repId, block.id, music);
                        else addMusic(repId, block.id, music);
                        setShowMusicModal(false);
                        setEditing(null);
                    }}
                />
            )}
        </div>
    );
}
