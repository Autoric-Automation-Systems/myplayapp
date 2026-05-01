'use client';
import Header from "./Header";
import TrackCard from "./Track";
import { Track } from "@/query/tracks/definitions";
import { PlayIcon } from "@heroicons/react/24/outline";

export function Tracks({ tracks }: { tracks: Track[] }) {
    if (!tracks) return null;
    return (
        <div className="space-y-0.5 sm:space-y-1.5">
            <Header />
            {tracks.length === 0 &&
                <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-white">
                    <PlayIcon className="w-12 h-12 text-orange-400" />
                    <p className="text-base sm:text-lg font-medium">Nenhuma musica ainda</p>
                    <p className="text-xs sm:text-sm mt-1 sm:mt-2">Clique no Menu e toque em + para criar Novo Musica</p>
                </div>
            }
            {tracks.map((t) => (
                <TrackCard key={t.id} track={t} />
            ))}
        </div>
    );
}