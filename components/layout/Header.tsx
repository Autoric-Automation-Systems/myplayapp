import { CurrentUser } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Header() {
    const user = await CurrentUser();
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
                <span className="text-sm sm:text-base text-white mr-2 sm:mr-4 ">
                    {user?.name}
                </span>
                <Image
                    src={user?.picture ?? ""}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="rounded-full ml-2 h-auto fill-current w-auto hover:brightness-75 " />

            </div>
        </header>
    )
}