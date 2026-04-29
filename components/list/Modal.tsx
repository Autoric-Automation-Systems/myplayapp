import { useState } from "react";
import type { List } from "@/query/lists/definitions";

export default function Modal({
    initial,
    onSave,
    onClose,
}: {
    initial?: List;
    onSave: (list: List) => void;
    onClose: () => void;
}) {
    //console.log("Modal - Repertório inicial:", initial?.name);
    const [list, setList] = useState<List>(
        initial || {
            id: "",
            user_id: "",
            title: "",
            is_favorite: false,
            is_public: false,
        }
    );

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-3 sm:p-0">
            <div className="bg-[#3a1707] p-4 sm:p-6 w-full sm:w-[480px] mx-0 sm:mx-auto rounded-2xl shadow-2xl border border-orange-900 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-2xl font-bold text-orange-400">
                        {initial ? "Editar Repertório" : "Novo Repertório"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-white/50 hover:text-white transition text-xl"
                    >
                        ✕
                    </button>
                </div>

                <div className="mb-3">
                    <label className="block text-xs sm:text-sm text-orange-300 mb-1 uppercase tracking-wider">
                        Nome do repertório
                    </label>
                    <input
                        className="w-full p-2 sm:p-2.5 rounded-lg bg-[#2b1205] border border-orange-900 text-white placeholder:text-white/30 focus:outline-none focus:border-green-500 transition text-sm"
                        placeholder="Nome do repertório"
                        value={list.title}
                        onChange={(e) => setList({ ...list, title: e.target.value })}
                    />
                </div>

                {/* Toggle Público */}
                {initial && (
                    <div className="mb-4 p-3 bg-black/20 rounded-xl">
                        <label className="flex items-center justify-between cursor-pointer">
                            <div>
                                <span className="text-sm text-white font-medium">Repertório Público</span>
                                <p className="text-xs text-white/40 mt-0.5">Qualquer pessoa pode ver com o link</p>
                            </div>
                            <div
                                onClick={() => setList({ ...list, is_public: !list.is_public })}
                                className={`relative w-11 h-6 rounded-full transition-colors ${list.is_public ? 'bg-green-500' : 'bg-white/20'}`}
                            >
                                <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${list.is_public ? 'translate-x-5' : ''}`} />
                            </div>
                        </label>
                    </div>
                )}

                <div className="flex justify-end gap-3 pt-3 sm:pt-4 border-t border-orange-900">
                    <button
                        onClick={onClose}
                        className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition text-sm"
                    >
                        Cancelar
                    </button>
                    <button
                        className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-semibold text-sm"
                        onClick={() => onSave(list)}
                    >
                        {initial ? "Atualizar" : "Adicionar"}
                    </button>
                </div>
            </div>
        </div>
    );
}