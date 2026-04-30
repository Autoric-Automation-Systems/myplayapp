'use client';
import { PowerIcon } from "@heroicons/react/24/outline";

import { signOut } from '@/lib/auth';
import { Button } from "@nextui-org/react";

export default function LogoffCard() {
    function handleSignOut() {
        signOut({ redirectTo: '/' });
    }
    return (
        <div className="relative z-40 bg-white/10 hover:bg-white/20 text-white p-2 m-4 rounded-lg text-sm flex items-center gap-2 cursor-pointer transition-colors">
            <Button isIconOnly size="sm" color="danger" radius="full" onPress={() => handleSignOut()}>
                Sair
            </Button>
            <PowerIcon className="w-8 h-8" />
        </div>
    )
}