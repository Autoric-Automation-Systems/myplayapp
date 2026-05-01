import { CurrentUser } from "@/lib/utils";
import Image from "next/image";

export default async function ProfileCard() {
    const user = await CurrentUser();
    if (!user) return null;
    return (
        <>
            <div className="flex items-center gap-4 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
                <Image
                    src={user?.picture ?? ""}
                    alt="Avatar"
                    width={64}
                    height={64}
                    className="rounded-full h-auto w-auto"
                />
                <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white/90">
                        {user?.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                    {/* Data de criação do usuário */}
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Criado em: {(user?.created_at).toLocaleDateString("pt-BR")}
                    </p>
                </div>
            </div>
        </>
    );
}