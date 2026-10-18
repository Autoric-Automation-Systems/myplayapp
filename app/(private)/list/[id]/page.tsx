import Blocks from '@/components/block/Blocks';
import Header from '@/components/list/Header';
import MessageBoundary from '@/components/ui/MessageBoundary';
import { getOwnedListDetail } from '@/server/services/repertoire';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const { list, blocks } = await getOwnedListDetail(id);

  return (
    <div className="p-3 sm:p-6">
      <MessageBoundary />
      <Header list={list} />
      <Blocks blocks={blocks} />
    </div>
  );
}
