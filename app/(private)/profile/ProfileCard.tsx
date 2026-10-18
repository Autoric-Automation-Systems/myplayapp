import Image from 'next/image';
import type { User } from '@/server/types';

export default function ProfileCard({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-orange-900/40 bg-surface p-4 sm:p-6">
      <Image
        src={user.picture ?? '/logo.png'}
        alt=""
        width={64}
        height={64}
        className="h-16 w-16 rounded-full object-cover"
      />
      <div className="min-w-0">
        <h2 className="truncate text-lg font-semibold text-white sm:text-xl">{user.name}</h2>
        <p className="truncate text-sm text-white/50">{user.email}</p>
        <p className="text-xs text-white/40">
          Criado em: {new Date(user.created_at).toLocaleDateString('pt-BR')}
        </p>
      </div>
    </div>
  );
}
