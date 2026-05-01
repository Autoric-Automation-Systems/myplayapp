'use client';
import type { Block } from "@/query/blocks/definitions";
import { EditBlock, DeleteBlock } from "./Buttons";
import AddTrack from "../track/Buttons";
import { useState } from "react";
import { RectangleGroupIcon, Bars3Icon } from "@heroicons/react/24/outline";

export default function Header({ block }: { block: Block }) {
    const [menuOpen, setMenuOpen] = useState(false);

    if (!block) return null;

    return (
        <div className="flex items-center justify-between mb-4 sm:mb-8">
            <div className="flex items-start gap-2 min-w-0 flex-1">
                <RectangleGroupIcon className="w-8 h-8 text-orange-400 shrink-0 hidden sm:block" />
                <h1 className="text-sm sm:text-xl font-bold text-orange-400 truncate">
                    {block.title}
                </h1>
            </div>
            {/* Desktop buttons */}
            <div className="hidden sm:flex items-center gap-1 shrink-0">
                <EditBlock block={block} />
                <AddTrack block_id={block.id} />
                <DeleteBlock block={block} />
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden relative shrink-0">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-1.5 rounded-lg text-xl hover:bg-white/10 text-white/40 hover:text-white transition"
                >
                    <Bars3Icon className="w-8 h-8" />
                </button>
                {menuOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />

                        <div className="flex flex-row gap-1 absolute right-10 mt-1 w-auto p-1 rounded-xl shadow-2xl border border-white/10 z-50 overflow-hidden bg-[#3a1707] text-white">
                            <EditBlock block={block} />
                            <AddTrack block_id={block.id} />
                            <DeleteBlock block={block} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
