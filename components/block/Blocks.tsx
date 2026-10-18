import { RectangleGroupIcon } from '@heroicons/react/24/outline';
import { PanelProvider } from '@/context/PanelContext';
import type { BlockWithTracks } from '@/server/types';
import MobilePanel from '../track/MobilePanel';
import Panel from '../track/Panel';
import EmptyState from '../ui/EmptyState';
import BlockCard from './Block';

export default function Blocks({
  blocks,
  readOnly = false,
}: {
  blocks: BlockWithTracks[];
  readOnly?: boolean;
}) {
  return (
    <PanelProvider>
      <div className="flex gap-4">
        <div className="min-w-0 flex-1">
          {blocks.length === 0 ? (
            <EmptyState
              icon={RectangleGroupIcon}
              title="Nenhum bloco ainda"
              description={
                readOnly
                  ? 'Este repertório ainda não possui blocos.'
                  : 'Use o menu do repertório e toque em + para criar um novo bloco.'
              }
            />
          ) : (
            blocks.map((block) => (
              <BlockCard key={block.id} block={block} readOnly={readOnly} />
            ))
          )}
        </div>

        <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-96 shrink-0 overflow-y-auto pt-4 pr-1 lg:block">
          <Panel />
        </aside>
      </div>

      <MobilePanel />
    </PanelProvider>
  );
}
