'use client';
import Header from "./Header";
import TrackCard from "./Track";
import { Track } from "@/query/tracks/definitions";

export function Tracks({ tracks }: { tracks: Track[] }) {
    if (!tracks) return null;
    return (
        <div className="space-y-0.5 sm:space-y-1.5">
            <Header />
            {tracks.map((t) => (
                <TrackCard key={t.id} track={t} />
            ))}
        </div>
    );
}