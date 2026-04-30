'use client';
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function LoginCard() {
    return (
        <form onSubmit={(e) => { e.preventDefault(); signIn('google') }}>
            <button
                type="submit"
                className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                <FcGoogle className="fill-current w-10 h-10" />
                Sign in with Google
            </button>
        </form>
    )
}