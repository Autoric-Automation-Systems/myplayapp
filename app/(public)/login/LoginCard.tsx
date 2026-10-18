'use client';

import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

export default function LoginCard() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        signIn('google', { redirectTo: '/dashboard' });
      }}
    >
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-3 rounded-lg bg-gray-100 px-7 py-3 text-sm font-normal text-gray-700 transition-colors hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
      >
        <FcGoogle className="h-10 w-10 fill-current" />
        Entrar com Google
      </button>
    </form>
  );
}
