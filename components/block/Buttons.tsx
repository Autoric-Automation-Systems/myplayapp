'use client';
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import Modal from "./Modal";
import { useState } from "react";
import type { Block } from "@/query/blocks/definitions";
import { addBlock, editBlock, deleteBlock } from "@/query/blocks/actions";

export default function AddBlock({ list_id }: { list_id: string }) {
    const [open, setOpen] = useState(false);

    function handleSave(block: Block) {
        const add = { ...block, list_id };
        addBlock(add);
        setOpen(false);
    }
    return (
        <>
            <Button isIconOnly color="success" radius="full" size="lg" onPress={() => setOpen(true)} title="Novo Bloco"
                className=" transition text-xl">
                <PlusIcon className="h-10 w-10" />
            </Button>

            {open &&
                <Modal onClose={() => setOpen(false)} onSave={(block) => handleSave(block)} />
            }
        </>
    );
}

export function EditBlock({ block }: { block: Block }) {
    const [open, setOpen] = useState(false);
    function handleSave(block: Block) {
        editBlock(block);
        setOpen(false);
    }
    return (
        <>
            <Button isIconOnly color="success" radius="full" size="md" onPress={() => setOpen(true)} title="Editar Bloco"
                className=" transition text-xl">
                <PencilIcon className="h-7 w-7" />
            </Button>

            {open &&
                <Modal onClose={() => setOpen(false)} onSave={(block) => handleSave(block)} initial={block} />
            }
        </>
    );
}


export function DeleteBlock({ block }: { block: Block }) {
    function handleDelete() {
        if (confirm("Remover este bloco?")) {
            if (!block) return;
            deleteBlock(block.id);
        }
    }
    return (
        <Button isIconOnly color="success" radius="full" size="md" onPress={() => handleDelete()} title="Remover Bloco"
            className="transition text-xl">
            <TrashIcon className="h-7 w-7" />
        </Button>
    );
}