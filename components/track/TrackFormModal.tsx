'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { Field, Select, TextInput, Textarea } from '@/components/ui/form';
import { useAction } from '@/components/ui/useAction';
import { createTrack, updateTrack } from '@/server/actions/tracks';
import type { Track } from '@/server/types';

const NOTAS = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
  'Cm', 'C#m', 'Dm', 'D#m', 'Em', 'Fm', 'F#m', 'Gm', 'G#m', 'Am', 'A#m', 'Bm',
];

const ESTILOS = [
  'Rock', 'Pop', 'Jazz', 'Blues', 'Funk',
  'Samba', 'Bossa Nova', 'MPB', 'Forró', 'Gospel',
  'Pagode', 'Axé', 'Sertanejo', 'Reggae',
  'Xote', 'Frevo', 'Maracatu', 'Lambada', 'Carimbó',
  'Choro', 'Tango', 'Salsa', 'Merengue', 'Cumbia',
  'Fado', 'Flamenco', 'Bolero', 'Valsa', 'Zouk',
  'Lounge', 'Eletrônica', 'Clássica', 'Trance',
  'House', 'Techno', 'Dubstep', 'Drum and Bass',
  'Trap', 'Hip Hop', 'Rap', 'R&B', 'Soul',
  'Outro',
];

type FormValues = {
  title: string;
  artist: string;
  key: string;
  bpm: number;
  style: string;
  lyrics: string;
};

export default function TrackFormModal({
  blockId,
  track,
  onClose,
}: {
  blockId: string;
  track?: Track;
  onClose: () => void;
}) {
  const [values, setValues] = useState<FormValues>({
    title: track?.title ?? '',
    artist: track?.artist ?? '',
    key: track?.key ?? '',
    bpm: track?.bpm || 100,
    style: track?.style ?? '',
    lyrics: track?.lyrics ?? '',
  });
  const { run, pending, error } = useAction();

  function update<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit() {
    if (track) {
      run(() => updateTrack(track.id, values), onClose);
      return;
    }
    run(() => createTrack(blockId, values), onClose);
  }

  return (
    <Modal
      title={track ? 'Editar Música' : 'Nova Música'}
      submitLabel={track ? 'Atualizar' : 'Adicionar'}
      pending={pending}
      error={error}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <Field label="Título">
        <TextInput
          value={values.title}
          onChange={(event) => update('title', event.target.value)}
          placeholder="Título"
          maxLength={200}
          autoFocus
        />
      </Field>

      <Field label="Artista">
        <TextInput
          value={values.artist}
          onChange={(event) => update('artist', event.target.value)}
          placeholder="Artista"
          maxLength={200}
        />
      </Field>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <Field label="Tom">
          <Select value={values.key} onChange={(event) => update('key', event.target.value)}>
            <option value="">-</option>
            {NOTAS.map((nota) => (
              <option key={nota} value={nota}>
                {nota}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="BPM">
          <input
            type="range"
            min={20}
            max={400}
            value={values.bpm}
            onChange={(event) => update('bpm', Number(event.target.value))}
            className="w-full accent-green-500"
          />
          <div className="mt-0.5 text-center font-mono text-xs text-cyan-400 sm:text-sm">
            {values.bpm}
          </div>
        </Field>

        <Field label="Estilo">
          <Select value={values.style} onChange={(event) => update('style', event.target.value)}>
            <option value="">-</option>
            {ESTILOS.map((estilo) => (
              <option key={estilo} value={estilo}>
                {estilo}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Letra">
        <Textarea
          value={values.lyrics}
          onChange={(event) => update('lyrics', event.target.value)}
          placeholder="Digite a letra da música..."
          rows={6}
        />
      </Field>
    </Modal>
  );
}
