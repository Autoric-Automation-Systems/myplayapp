import { sql } from '@/server/db';
import type { Track } from '@/server/types';
import type { TrackInput } from '@/server/schemas/track';

export async function findTrackById(id: string): Promise<Track | null> {
  const rows = await sql`
    SELECT id, block_id, title, key, bpm, style, artist, lyrics, created_at
    FROM public.tracks
    WHERE id = ${id}
  `;
  return (rows[0] as Track | undefined) ?? null;
}

export async function insertTrack(blockId: string, input: TrackInput): Promise<void> {
  await sql`
    INSERT INTO public.tracks (block_id, title, key, bpm, style, artist, lyrics)
    VALUES (
      ${blockId},
      ${input.title},
      ${input.key},
      ${input.bpm},
      ${input.style},
      ${input.artist},
      ${input.lyrics}
    )
  `;
}

export async function updateTrackById(id: string, input: TrackInput): Promise<void> {
  await sql`
    UPDATE public.tracks
    SET
      title = ${input.title},
      key = ${input.key},
      bpm = ${input.bpm},
      style = ${input.style},
      artist = ${input.artist},
      lyrics = ${input.lyrics}
    WHERE id = ${id}
  `;
}

export async function deleteTrackById(id: string): Promise<void> {
  await sql`DELETE FROM public.tracks WHERE id = ${id}`;
}
