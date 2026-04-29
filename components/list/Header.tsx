'use client';
import type { List } from "@/query/lists/definitions";
import { EditList, ShareList, DeleteList } from "./Buttons";
import AddBlock from "../block/Buttons";
import { useState } from "react";

export default function Header({ list }: { list: List }) {
    const [menuOpen, setMenuOpen] = useState(false);

    if (!list) return null;

    return (
        <div className="flex items-center justify-between mb-4 sm:mb-8">
            <div className="hidden sm:flex">
                <h1 className="text-sm sm:text-xl font-bold text-orange-400 truncate">
                    🎶{list.title}
                </h1>
                {list.is_public ? (
                    <>
                        <p className="text-white/50 text-xs sm:text-sm mt-0.5 sm:mt-1 pl-2">

                            Repertório Publico</p>
                        <ShareList list={list} />
                    </>
                ) : (<p className="text-white/50 text-xs sm:text-sm mt-0.5 sm:mt-1 pl-2">Repertório Privado</p>)
                }
            </div>
            {/* Desktop buttons */}
            <div className="hidden sm:flex">
                <EditList list={list} />
                <AddBlock list_id={list.id} />
                <DeleteList list={list} />
            </div>

            {/* Mobile menu button */}
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
                        <div className="absolute right-0 mt-1 w-40 bg-[#2b1205] rounded-xl shadow-2xl border border-white/10 z-50 overflow-hidden">
                            <EditList list={list} />
                            <DeleteList list={list} />
                            <ShareList list={list} />
                            <AddBlock list_id={list.id} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
