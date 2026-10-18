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
        className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-white px-6 text-sm font-semibold text-gray-800 shadow-lg transition-colors hover:bg-gray-100 active:scale-[0.99]"
      >
        <FcGoogle className="h-6 w-6" />
        Entrar com Google
      </button>
    </form>
  );
}
