'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  ArrowRightStartOnRectangleIcon,
  InformationCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import DropdownMenu from '@/components/ui/DropdownMenu';
import type { User } from '@/server/types';

export default function LogoutButton({ user }: { user: User }) {
  const router = useRouter();

  async function handleLogout() {
    await signOut({ redirect: false });
    router.replace('/');
    router.refresh();
  }

  return (
    <DropdownMenu
      label="Menu do usuário"
      trigger={
        <span className="flex items-center gap-2 pr-1">
          <Image
            src={user.picture ?? '/logo.png'}
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="hidden max-w-40 truncate text-sm text-white sm:inline">{user.name}</span>
        </span>
      }
      items={[
        {
          label: 'Meu Perfil',
          icon: <UserCircleIcon className="h-6 w-6" />,
          href: '/profile',
        },
        {
          label: 'Sobre o App',
          icon: <InformationCircleIcon className="h-6 w-6" />,
          href: '/infoApp',
        },
        {
          label: 'Sair',
          icon: <ArrowRightStartOnRectangleIcon className="h-6 w-6" />,
          onSelect: handleLogout,
          danger: true,
        },
      ]}
    />
  );
}
