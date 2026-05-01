import { fetchDataBlocks } from "@/query/blocks/data";
import { Block } from "@/query/blocks/definitions";
import BlockCard from "./Block";
import Panel from "../track/Panel";
import MobilePanel from "../track/MobilePanel";
import { PanelProvider } from "@/context/PanelContext";
import { RectangleGroupIcon } from "@heroicons/react/24/outline";

export default async function Blocks({ id }: { id: string }) {
    const blocks = await fetchDataBlocks(id);
    return (
        <PanelProvider>
            <div className="flex gap-4">
                <div className="flex-1 min-w-0">
                    {blocks.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 sm:py-20">
                            <RectangleGroupIcon className="w-12 h-12 text-orange-400" />
                            <p className="text-base sm:text-lg font-medium">Nenhum bloco ainda</p>
                            <p className="text-xs sm:text-sm mt-1 sm:mt-2">Clique no Menu e toque em + para criar Novo Bloco</p>
                        </div>
                    )}
                    {blocks && blocks.map((block: Block) => (
                        <BlockCard key={block.id} block={block} />
                    ))}
                </div>
                <aside className="w-96 hidden lg:block sticky top-0 h-screen overflow-y-auto">
                    <Panel />
                </aside>
            </div>
            <MobilePanel />
        </PanelProvider>
    );
}