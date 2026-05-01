'use client';

import { CheckIcon, InformationCircleIcon, XMarkIcon, ExclamationCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function MsgPage() {
    const searchParams = useSearchParams();
    const [open, setOpen] = useState(true);

    const title = searchParams.get('title');
    const message = searchParams.get('message');
    const type = searchParams.get('type');

    if (!title || !message || !type || !open) return null;

    const formateMsg = {
        classes: '',
        icon: <CheckIcon width={24} height={24} />,
    }

    if (type === 'success') {
        formateMsg.classes = 'bg-green-300 dark:bg-green-800/50';
        formateMsg.icon = <CheckIcon width={24} height={24} />;
    }
    if (type === 'error') {
        formateMsg.classes = 'bg-red-300 dark:bg-red-800/50';
        formateMsg.icon = <XMarkIcon width={24} height={24} />;
    }
    if (type === 'info') {
        formateMsg.classes = 'bg-blue-300 dark:bg-blue-800/50';
        formateMsg.icon = <InformationCircleIcon width={24} height={24} />;
    }
    if (type === 'warning') {
        formateMsg.classes = 'bg-yellow-300 dark:bg-yellow-800/50';
        formateMsg.icon = <ExclamationCircleIcon width={24} height={24} />;
    }

    function closeMsg() {
        setOpen(false);
        window.location.href = window.location.pathname;
    }

    return (
        <div
            className={`rounded-xl border mb-4 p-4 md:p-5 ${formateMsg.classes} dark:border-gray-800`}
        >
            <div className="flex items-start gap-3">
                <div className={`-mt-0.5 flex h-8 w-8 items-center justify-center rounded-full`}>
                    {formateMsg.icon}
                </div>

                <div className="flex-1">
                    <h4 className="mb-1 text-sm font-semibold text-gray-800 dark:text-white/90">
                        {title}
                    </h4>

                    <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>

                </div>
                {/*Button Close */}
                <Button
                    isIconOnly
                    size="md"
                    className="ml-auto hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-500"
                    onPress={closeMsg}
                >
                    <XCircleIcon width={24} height={24} className="text-gray-500 dark:text-gray-400" />
                </Button>
            </div>
        </div>
    );
}