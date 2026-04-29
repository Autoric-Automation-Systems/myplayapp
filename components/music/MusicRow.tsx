import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Music } from "../../types";

interface MusicRowProps {
    music: Music;
    blockId: string;
    onClick?: () => void;
    onDelete?: () => void;
    onEdit?: () => void;
}

export default function MusicRow({ music, blockId, onClick, onDelete, onEdit }: MusicRowProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: `${music.id}|${blockId}`,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.07] rounded-lg px-2 sm:px-3 py-2 sm:py-2.5 transition-all duration-150 border border-transparent hover:border-orange-800/40 group"
        >
            {/* Drag handle */}
            <span
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing text-white/20 hover:text-white/40 transition-colors select-none flex-shrink-0 text-sm"
            >
                ⠿
            </span>
            {/* Título */}
            <div className="flex-1 min-w-0">
                <span className="text-white text-xs sm:text-sm font-medium truncate block">{music.title}</span>
            </div>

            {/* Tom + BPM - hidden on very small */}
            <div className="hidden xs:flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                {music.key && (
                    <span className="bg-orange-800/40 text-orange-300 text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-md">
                        {music.key}
                    </span>
                )}
                {music.bpm > 0 && (
                    <span className="text-cyan-400/80 font-mono text-[10px] sm:text-xs flex-shrink-0">
                        {music.bpm}
                    </span>
                )}
            </div>

            {/* Estilo - hidden on small */}
            {music.style && (
                <span className="hidden sm:inline-block bg-purple-800/40 text-purple-300 text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-md flex-shrink-0">
                    {music.style}
                </span>
            )}

            {/* Ações - sempre visível */}
            <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onClick?.(); }}
                    className="p-1 sm:p-1.5 rounded-md hover:bg-green-900/30 text-green-400/70 hover:text-green-300 transition-all text-xs sm:text-sm"
                    title="Ver detalhes"
                >
                    👁️
                </button>
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onEdit?.(); }}
                    className="p-1 sm:p-1.5 rounded-md hover:bg-blue-900/30 text-blue-400/70 hover:text-blue-300 transition-all text-xs sm:text-sm"
                    title="Editar"
                >
                    📝
                </button>
                {onDelete && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (confirm("Remover esta música?")) onDelete();
                        }}
                        className="p-1 sm:p-1.5 rounded-md hover:bg-red-900/30 text-red-400/70 hover:text-red-300 transition-all text-xs sm:text-sm"
                        title="Remover"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
}

