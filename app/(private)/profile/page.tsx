import MessageBoundary from '@/components/ui/MessageBoundary';
import { requireUser } from '@/server/session';
import DeleteCard from './DeleteCard';
import ProfileCard from './ProfileCard';

export default async function ProfilePage() {
  const user = await requireUser();

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-3 sm:p-6">
      <MessageBoundary />
      <ProfileCard user={user} />
      <DeleteCard />
    </div>
  );
}
