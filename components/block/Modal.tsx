import { useState } from "react";
import type { Block } from "@/query/blocks/definitions";

export default function BlockModal({
    initial,
    onSave,
    onClose,
}: {
    initial?: Block;
    onSave: (block: Block) => void;
    onClose: () => void;
}) {
    const [b, setB] = useState<Block>(
        initial || {
            id: "",
            list_id: "",
            title: "",
            position: 0
        }
    );

    const input = (k: keyof Block, placeholder?: string) => (
        <div className="mb-3">
            <label className="block text-sm text-orange-300 mb-1 uppercase tracking-wider">
                {placeholder || k}
            </label>
            <input
                className="w-full p-2.5 rounded-lg bg-[#2b1205] border border-orange-900 text-white placeholder:text-white/30 focus:outline-none focus:border-green-500 transition"
                placeholder={placeholder || k}
                value={(b[k] as string)}
                onChange={(e) => setB({ ...b, [k]: e.target.value })}
            />
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-[#3a1707] p-6 w-[480px] rounded-2xl shadow-2xl border border-orange-900 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-orange-400">
                        {initial ? "Editar Bloco" : "Novo Bloco"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-white/50 hover:text-white transition text-xl"
                    >
                        ✕
                    </button>
                </div>

                {input("title", "Nome do bloco")}

                <div className="flex justify-end gap-3 pt-4 border-t border-orange-900">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        className="px-6 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-semibold"
                        onClick={() => onSave(b)}
                    >
                        {initial ? "Atualizar" : "Adicionar"}
                    </button>
                </div>
            </div>
        </div>
    );
}