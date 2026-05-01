import LoginCard from "./LoginCard";
import Image from "next/image";
import Link from "next/link";
import { CurrentUser } from "@/lib/utils";
import { redirect } from 'next/navigation';

export default async function Page() {
    const user = await CurrentUser();
    if (user) redirect('/dashboard');

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#2b1205] to-[#1a0a02] text-white">
            <Link href="/">
                <Image
                    width={500}
                    height={500}
                    src="/logo.png"
                    alt="Logo"
                    className="w-84"
                    loading="eager" />
            </Link>
            <LoginCard />
        </div>
    );
}