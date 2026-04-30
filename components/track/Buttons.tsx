'use client';
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import Modal from "./Modal";
import { useState } from "react";
import type { Track } from "@/query/tracks/definitions"
import { deleteTrack, editTrack, addTrack } from "@/query/tracks/actions";

export default function AddTrack({ block_id }: { block_id: string }) {
    const [open, setOpen] = useState(false);

    function handleSave(track: Track) {
        const add = { ...track, block_id };
        addTrack(add);
        setOpen(false);
    }
    return (
        <>
            <Button isIconOnly color="success" radius="full" size="md" onPress={() => setOpen(true)} title="Nova Faixa"
                className="text-white/50 hover:text-white transition text-xl">
                <PlusIcon className="h-7 w-7" />
            </Button>

            {open &&
                <Modal onClose={() => setOpen(false)} onSave={(track) => handleSave(track)} />
            }
        </>
    );
}

export function EditTrack({ track }: { track: Track }) {
    {
        const [open, setOpen] = useState(false);
        function handleSave(track: Track) {
            editTrack(track);
            setOpen(false);
        }
        return (
            <>
                <Button isIconOnly color="success" radius="full" size="sm" onPress={() => setOpen(true)} title="Editar Faixa"
                    className="text-white/50 hover:text-white transition text-xl">
                    <PencilIcon className="h-5 w-5" />
                </Button>

                {open &&
                    <Modal onClose={() => setOpen(false)} onSave={(track) => handleSave(track)} initial={track} />
                }
            </>
        );
    }
}


export function DeleteTrack({ track }: { track: Track }) {
    function handleDelete() {
        if (confirm("Remover esta faixa?")) {
            if (!track) return;
            deleteTrack(track.id);
        }
    }
    return (
        <Button isIconOnly color="success" radius="full" size="sm" onPress={() => handleDelete()} title="Remover Faixa"
            className="text-white/50 hover:text-white transition text-xl">
            <TrashIcon className="h-5 w-5" />
        </Button>
    );
}