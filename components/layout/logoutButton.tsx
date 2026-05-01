'use client';
import { signOut } from 'next-auth/react';
import { PowerIcon, UserCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User } from "@/query/users/definitions";

export default function LogoutButton({ user }: { user: User }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
    router.refresh();
  };

  return (
    <div className="relative flex items-center">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center gap-2 rounded-full hover:bg-white/10 transition p-1 pr-2"
      >
        <Image
          src={user?.picture ?? ""}
          alt="Avatar"
          width={36}
          height={36}
          className="rounded-full h-auto w-auto hover:brightness-75"
        />
        <span className="text-sm sm:text-base text-white">
          {user?.name}
        </span>
      </button>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
          <div className="flex flex-col gap-1 absolute right-0 top-full mt-2 w-44 p-1 rounded-xl shadow-2xl border border-white/10 z-50 overflow-hidden bg-[#3a1707] text-white">
            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 hover:bg-white/10 rounded-lg transition-colors p-2"
            >
              <UserCircleIcon className="w-6 h-6" />
              <span>Meu Perfil</span>
            </Link>
            <Link
              href="/infoApp"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 hover:bg-white/10 rounded-lg transition-colors p-2"
            >
              <InformationCircleIcon className="w-6 h-6" />
              <span>Sobre o App</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 hover:bg-white/10 rounded-lg transition-colors p-2"
            >
              <PowerIcon className="w-6 h-6" />
              <span>Sair</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}