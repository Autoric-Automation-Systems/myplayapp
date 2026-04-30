import type { Block } from "@/query/blocks/definitions";
import Header from "./Header";
import { fetchDataTracks } from "@/query/tracks/data";
import { Tracks } from "../track/Tracks";

export default async function BlockCard({ block }: { block: Block }) {
    const tracks = await fetchDataTracks(block.id);

    return (
        <div className="space-y-2 sm:space-y-4 mb-2 sm:mb-4 p-2 sm:p-4 bg-[#3a1707] rounded-xl border border-orange-900/40">
            <Header block={block} />
            <Tracks tracks={tracks} />
        </div>
    );
}
