import AddList from '@/components/list/AddList';

export default function DashboardHeader({ count }: { count: number }) {
  return (
    <div className="mb-4 flex items-center justify-between sm:mb-8">
      <div>
        <h1 className="text-lg font-bold text-orange-400 sm:text-2xl">Meus Repertórios</h1>
        <p className="mt-0.5 text-xs text-white/50 sm:mt-1 sm:text-sm">
          {count} repertório{count !== 1 ? 's' : ''}
        </p>
      </div>
      <AddList />
    </div>
  );
}
