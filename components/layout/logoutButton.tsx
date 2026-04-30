'use client';
import { signOut } from 'next-auth/react';
import { PowerIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 p-4 hover:bg-white/10 rounded-full transition-colors m-2"
    >
      <PowerIcon className="w-8 h-8" />
    </button>
  );
}