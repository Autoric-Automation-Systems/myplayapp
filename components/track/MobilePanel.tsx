'use client';

import { usePanel } from "@/context/PanelContext";
import { useState } from "react";
import { ArrowUturnLeftIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function MobilePanel() {
    const { isOpen, track, closePanel } = usePanel();
    const [font, setFont] = useState(16);

    if (!isOpen || !track) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                onClick={closePanel}
            />

            {/* Panel */}
            <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden max-h-[85vh] bg-[#3a1707] rounded-t-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
                {/* Handle */}
                <div className="flex justify-center pt-2 pb-1">
                    <div className="w-10 h-1 rounded-full bg-white/20" />
                </div>

                {/* Header */}
                <div className="flex items-start justify-between px-5 pt-2 pb-4 border-b border-orange-900/30 shrink-0">
                    <div className="min-w-0 flex-1 pr-4">
                        <h2 className="text-lg font-bold text-orange-400 leading-tight truncate">
                            {track.title}
                        </h2>
                        {track.artist && (
                            <p className="text-sm text-white/50 mt-0.5 truncate">{track.artist}</p>
                        )}
                    </div>
                    <button
                        onClick={closePanel}
                        className="p-1 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition shrink-0"
                    >
                        <XCircleIcon className="w-7 h-7" />
                    </button>
                </div>

                {/* Tags */}
                <div className="flex gap-2 px-5 py-3 flex-wrap shrink-0">
                    <span className="bg-orange-800/50 text-orange-300 px-2.5 py-0.5 rounded-lg text-xs font-medium">
                        {track.key}
                    </span>
                    <span className="bg-cyan-800/50 text-cyan-300 px-2.5 py-0.5 rounded-lg text-xs font-mono font-medium">
                        {track.bpm} BPM
                    </span>
                    <span className="bg-purple-800/50 text-purple-300 px-2.5 py-0.5 rounded-lg text-xs font-medium">
                        {track.style}
                    </span>
                </div>

                {/* Font controls */}
                <div className="flex items-center gap-3 mx-5 mb-3 p-2.5 bg-black/20 rounded-xl shrink-0">
                    <span className="text-[10px] text-white/40 uppercase tracking-wider font-medium">Tamanho</span>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setFont(prev => Math.max(prev - 2, 10))}
                            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition text-xs font-medium disabled:opacity-40"
                            disabled={font <= 10}
                        >
                            A-
                        </button>
                        <span className="w-10 text-center text-xs text-white/60 font-mono">{font}px</span>
                        <button
                            onClick={() => setFont(prev => Math.min(prev + 2, 32))}
                            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition text-xs font-medium disabled:opacity-40"
                            disabled={font >= 32}
                        >
                            A+
                        </button>
                    </div>
                </div>

                {/* Lyrics */}
                <div className="flex-1 overflow-y-auto px-5 pb-6">
                    {track.lyrics ? (
                        <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                            <pre
                                className="whitespace-pre-wrap font-sans text-white/90 leading-relaxed"
                                style={{ fontSize: `${font}px` }}
                            >
                                {track.lyrics}
                            </pre>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-white/30">
                            <span className="text-2xl mb-2">📝</span>
                            <p className="text-sm">Nenhuma letra disponível</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
