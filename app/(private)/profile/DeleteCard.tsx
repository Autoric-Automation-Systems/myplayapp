'use client';
import { deleteData } from "@/query/users/actions";
import { User } from "@/query/users/definitions";
import { Button } from "@nextui-org/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { signOut } from 'next-auth/react';

export default function DeleteCard({ user }: { user: User }) {
    const router = useRouter();

    if (!user) return null;

    async function handleDelete() {
        const confirmed = window.confirm("Tem certeza que deseja deletar sua conta? Esta ação é irreversível.");
        if (!confirmed) return;
        await signOut({ redirect: false });
        await deleteData(user.id!);
        router.push('/');
        router.refresh();
    }

    return (
        <div className="p-4 sm:p-6 rounded-xl border border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-900/10">
            <h3 className="text-base sm:text-lg font-semibold text-red-800 dark:text-red-400 mb-2">
                Zona de Perigo
            </h3>
            <p className="text-sm text-red-600 dark:text-red-400/80 mb-4">
                Ao deletar sua conta, todos os seus dados serão permanentemente removidos.
            </p>
            <Button
                onPress={handleDelete}
                color="danger"
                className="w-full flex items-center justify-center gap-2"
                size="md"
                radius="full"
                startContent={<TrashIcon className="w-5 h-5" />}
            >
                Deletar minha conta
            </Button>
        </div>
    )
}