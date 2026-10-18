import type { BlockWithTracks } from '@/server/types';
import { Tracks } from '../track/Tracks';
import Header from './Header';

export default function BlockCard({
  block,
  readOnly = false,
}: {
  block: BlockWithTracks;
  readOnly?: boolean;
}) {
  return (
    <div className="mb-2 space-y-2 rounded-xl border border-orange-900/40 bg-surface p-2 sm:mb-4 sm:space-y-4 sm:p-4">
      <Header block={block} readOnly={readOnly} />
      <Tracks tracks={block.tracks} readOnly={readOnly} />
    </div>
  );
}
