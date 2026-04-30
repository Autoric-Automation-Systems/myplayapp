import Link from "next/link";
import { fetchDataBlockCount } from "@/query/blocks/data";
import { List } from "@/query/lists/definitions";

export default async function CardList({ list }: { list: List }) {
    const blocksCount = await fetchDataBlockCount(list.id);
    return (
        <div
            key={list.id}
            className="group relative bg-[#3a1707] rounded-xl border border-orange-900/40 p-3 sm:p-5 cursor-pointer hover:border-orange-700/60 transition-all hover:shadow-lg hover:shadow-orange-900/20 active:scale-[0.98]"
        >
            {/* Ícone e nome */}
            <Link href={`/list/${list.id}`} className="block">
                <div className="flex items-start gap-2 sm:gap-3">
                    <span className="text-xl sm:text-2xl">🎶</span>
                    <div className="min-w-0 flex-1">
                        <h3 className="text-white font-semibold text-sm sm:text-lg truncate">
                            {list.title}
                        </h3>
                        <p className="text-white/40 text-xs sm:text-sm mt-0.5 sm:mt-1">
                            {blocksCount} bloco{blocksCount !== 1 ? "s" : ""}
                        </p>
                    </div>
                </div>

                {/* Seta indicativa */}
                <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-orange-400/60 transition-all group-hover:translate-x-1 text-xs sm:text-base">
                    →
                </div>

            </Link>
        </div>
    );

}