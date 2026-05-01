'use client';
import type { List } from "@/query/lists/definitions";
import { EditList, ShareList, DeleteList } from "./Buttons";
import AddBlock from "../block/Buttons";
import { useState } from "react";
import { MusicalNoteIcon, Bars4Icon } from "@heroicons/react/24/outline";

export default function Header({ list }: { list: List }) {
    const [menuOpen, setMenuOpen] = useState(false);

    if (!list) return null;

    return (
        <div className="flex items-center justify-between mb-4 sm:mb-8">
            <div className="flex items-start gap-2 min-w-0 flex-1">
                <MusicalNoteIcon className="w-8 h-8 text-orange-400 shrink-0 hidden sm:block" />
                <h1 className="text-sm sm:text-xl font-bold text-orange-400 truncate">
                    {list.title}
                </h1>
                {list.is_public ? (
                    <p className=" text-xs sm:text-sm mt-0.5 sm:mt-1 pl-2 truncate">Repertório Publico</p>
                ) : (
                    <p className="text-xs sm:text-sm mt-0.5 sm:mt-1 pl-2 truncate">Repertório Privado</p>
                )}
            </div>
            {/* Desktop buttons */}
            <div className="hidden sm:flex items-center gap-1 shrink-0">
                <ShareList list={list} />
                <EditList list={list} />
                <AddBlock list_id={list.id} />
                <DeleteList list={list} />
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden relative shrink-0">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-1.5 rounded-lg text-xl "
                >
                    <Bars4Icon className="w-8 h-8" />
                </button>
                {menuOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                        <div className="flex flex-row gap-1 absolute right-10 mt-1 w-auto p-2 rounded-xl shadow-2xl border border-white/10 z-50 overflow-hidden bg-[#3a1707] text-white">
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
