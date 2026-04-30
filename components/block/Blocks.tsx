import { fetchDataBlocks } from "@/query/blocks/data";
import { Block } from "@/query/blocks/definitions";
import BlockCard from "./Block";
import Panel from "../track/Panel";
import MobilePanel from "../track/MobilePanel";
import { PanelProvider } from "@/context/PanelContext";

export default async function Blocks({ id }: { id: string }) {
    const blocks = await fetchDataBlocks(id);
    return (
        <PanelProvider>
            <div className="flex gap-4">
                <div className="flex-1 min-w-0">
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