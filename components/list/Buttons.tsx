'use client';
import { PlusIcon, PencilIcon, ShareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import Modal from "./Modal";
import { useState } from "react";
import type { List } from "@/query/lists/definitions";
import { addList, editList } from "@/query/lists/actions";
import { deleteList } from "@/query/lists/actions";

export default function AddList() {
    const [open, setOpen] = useState(false);

    function handleSave(list: List) {
        addList(list);
        setOpen(false);
    }
    return (
        <>
            <Button isIconOnly color="success" radius="full" size="lg" onPress={() => setOpen(true)} title="Novo Repertório"
                className="transition text-xl ">
                <PlusIcon className="h-10 w-10" />
            </Button>

            {open &&
                <Modal onClose={() => setOpen(false)} onSave={(list) => handleSave(list)} />
            }
        </>
    );
}

export function EditList({ list }: { list: List }) {
    {
        const [open, setOpen] = useState(false);
        function handleSave(list: List) {
            editList(list);
            setOpen(false);
        }
        return (
            <>
                <Button isIconOnly color="success" radius="full" size="lg" onPress={() => setOpen(true)} title="Editar Repertório"
                    className="transition text-xl">
                    <PencilIcon className="h-10 w-10" />
                </Button>

                {open &&
                    <Modal onClose={() => setOpen(false)} onSave={(list) => handleSave(list)} initial={list} />
                }
            </>
        );
    }
}

export function ShareList({ list }: { list: List }) {
    function handleShare() {
        const url = `${window.location.origin}/view/${list?.id}`;
        if (navigator.share) {
            navigator.share({ title: list?.title, url });
        } else {
            navigator.clipboard.writeText(url);
            alert("Link copiado!");
        }
    }

    return (
        <Button isIconOnly color="success" radius="full" size="lg" onPress={() => handleShare()} title="Compartilhar Repertório"
            className="transition text-xl">
            <ShareIcon className="h-10 w-10" />
        </Button>
    );
}

export function DeleteList({ list }: { list: List }) {
    function handleDelete() {
        if (confirm("Remover este repertório?")) {
            if (!list) return;
            deleteList(list.id);
        }
    }
    return (
        <>
            <Button isIconOnly color="success" radius="full" size="lg" onPress={() => handleDelete()} title="Remover Repertório"
                className=" transition text-xl">
                <TrashIcon className="h-10 w-10" />
            </Button>
        </>
    );
}

