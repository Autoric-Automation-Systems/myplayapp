import { CurrentUser } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./logoutButton";

export default async function Header() {
    const user = await CurrentUser();
    if (!user) return null;
    return (
        <header className="flex items-center p-0 bg-[#3a1707]">
            <div>
                <Link href="/dashboard" className="flex items-center">
                    <Image
                        className="mr-2 fill-current h-auto w-auto"
                        src="/logo.png"
                        alt="Logo"
                        width={120}
                        height={120}
                        loading="eager"
                    />
                </Link>
            </div>
            <div className="ml-auto flex items-center mr-4">
                <LogoutButton user={user} />
            </div>
        </header>
    )
}