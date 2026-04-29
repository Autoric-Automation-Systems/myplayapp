'use client';
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";


export default function LoginCard() {
    return (
        <div className="min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2b1205] to-[#1a0a02] text-white">
            <Link href="/">
                <Image
                    width={500}
                    height={500}
                    src="/logo.png"
                    alt="Logo"
                    className="w-84" />
            </Link>

            <form onSubmit={(e) => { e.preventDefault(); signIn('google') }}>
                <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                    <FcGoogle className="fill-current w-10 h-10" />
                    Sign in with Google
                </button>
            </form>
        </div>
    )
}