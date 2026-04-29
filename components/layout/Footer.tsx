import Image from "next/image";
import Link from "next/link";

export default function Footer() {

    return (
        <footer className=" flex items-center p-0 bg-[#3a1707] border-t border-orange-900/30 fixed bottom-0 w-full ">
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
        </footer>
    )
}