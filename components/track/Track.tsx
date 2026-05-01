'use client';
import type { Track } from '@/query/tracks/definitions';
import { DeleteTrack, EditTrack } from "./Buttons";
import { usePanel } from '@/context/PanelContext';

export default function TrackCard({ track }: { track: Track }) {
    const { openPanel } = usePanel();
    return (
        <>
            <div
                onClick={() => openPanel(track)}
                className="flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.07] rounded-lg px-2 sm:px-3 py-2 sm:py-1.5 transition-all duration-150 border border-transparent hover:border-orange-800/40 group cursor-pointer text-white/80"
            >
                <div className="flex-1 sm:flex-[2] pl-2 truncate min-w-0">{track.title}</div>
                <div className="hidden sm:block sm:flex-[2] pl-2 truncate">{track.artist}</div>
                <div className="w-10 sm:w-12 text-center text-[11px] sm:text-sm">{track.key}</div>
                <div className="w-12 sm:w-14 text-center text-[11px] sm:text-sm">{track.bpm}</div>
                <div className="w-14 text-center hidden md:block  text-sm truncate">{track.style}</div>
                {/* Ações */}
                <div className="w-20 sm:w-28 flex items-center justify-end gap-0.5 sm:gap-1 pr-2 flex-shrink-0">
                    <EditTrack track={track} />
                    <DeleteTrack track={track} />
                </div>
            </div>
        </>
    );
}

