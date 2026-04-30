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
                className="flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.07] rounded-lg px-2 sm:px-3 py-2 sm:py-2.5 transition-all duration-150 border border-transparent hover:border-orange-800/40 group cursor-pointer"
            >
                <div className="flex-[2] pl-2 truncate">{track.title}</div>
                <div className="flex-[2] pl-2 truncate">{track.artist}</div>
                <div className="w-12 text-center text-white/70 text-sm">{track.key}</div>
                <div className="w-14 text-center text-white/70 text-sm">{track.bpm}</div>
                <div className="w-16 text-center hidden md:block text-white/70 text-sm truncate">{track.style}</div>
                {/* Ações */}
                <div className="w-28 flex items-center justify-end gap-0.5 sm:gap-1 pr-2 flex-shrink-0">
                    <EditTrack track={track} />
                    <DeleteTrack track={track} />
                </div>
            </div>
        </>
    );
}

