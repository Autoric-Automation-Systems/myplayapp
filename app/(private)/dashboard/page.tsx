import { MusicalNoteIcon } from '@heroicons/react/24/outline';
import CardList from '@/components/list/CardList';
import EmptyState from '@/components/ui/EmptyState';
import MessageBoundary from '@/components/ui/MessageBoundary';
import { getDashboardLists } from '@/server/services/repertoire';
import Header from './Header';

export default async function Dashboard() {
  const lists = await getDashboardLists();

  return (
    <div className="p-3 sm:p-6">
      <MessageBoundary />
      <Header count={lists.length} />

      {lists.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {lists.map((list) => (
            <CardList key={list.id} list={list} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={MusicalNoteIcon}
          title="Nenhum repertório ainda"
          description="Clique em Novo Repertório para começar"
        />
      )}
    </div>
  );
}
