import { moveInSequence } from '@/lib/reorder';
import { sql } from '@/server/db';
import type { List, Track, TrackWithList } from '@/server/types';
import type { TrackInput } from '@/server/schemas/track';

export async function findTrackById(id: string): Promise<Track | null> {
  const rows = await sql`
    SELECT id, block_id, title, key, bpm, style, artist, lyrics, position, created_at
    FROM public.tracks
    WHERE id = ${id}
  `;
  return (rows[0] as Track | undefined) ?? null;
}

export async function findTrackWithList(id: string): Promise<TrackWithList | null> {
  const rows = await sql`
    SELECT
      t.id, t.block_id, t.title, t.key, t.bpm, t.style, t.artist, t.lyrics,
      t.position, t.created_at,
      l.id             AS list_id,
      l.user_id,
      l.title          AS list_title,
      l.is_public,
      l.is_favorite,
      l.created_at     AS list_created_at
    FROM public.tracks t
    JOIN public.blocks b ON b.id = t.block_id
    JOIN public.lists l ON l.id = b.list_id
    WHERE t.id = ${id}
  `;

  const row = rows[0] as
    | (Track & {
        list_id: string;
        user_id: string;
        list_title: string;
        is_public: boolean;
        is_favorite: boolean;
        list_created_at: List['created_at'];
      })
    | undefined;
  if (!row) return null;

  return {
    track: {
      id: row.id,
      block_id: row.block_id,
      title: row.title,
      key: row.key,
      bpm: row.bpm,
      style: row.style,
      artist: row.artist,
      lyrics: row.lyrics,
      position: row.position,
      created_at: row.created_at,
    },
    list: {
      id: row.list_id,
      user_id: row.user_id,
      title: row.list_title,
      is_public: row.is_public,
      is_favorite: row.is_favorite,
      created_at: row.list_created_at,
    },
  };
}

export async function insertTrack(blockId: string, input: TrackInput): Promise<void> {
  await sql`
    INSERT INTO public.tracks (block_id, title, key, bpm, style, artist, lyrics, position)
    VALUES (
      ${blockId},
      ${input.title},
      ${input.key},
      ${input.bpm},
      ${input.style},
      ${input.artist},
      ${input.lyrics},
      (SELECT COALESCE(MAX(position), -1) + 1 FROM public.tracks WHERE block_id = ${blockId})
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

export async function moveTrackWithinBlock(
  blockId: string,
  trackId: string,
  direction: 'up' | 'down'
): Promise<boolean> {
  const rows = await sql`
    SELECT id
    FROM public.tracks
    WHERE block_id = ${blockId}
    ORDER BY position ASC, created_at ASC, id ASC
  `;

  const ids = rows.map((row) => (row as { id: string }).id);
  const reordered = moveInSequence(ids, trackId, direction);
  if (!reordered) return false;

  // Regrava a sequência inteira: corrige posições duplicadas herdadas de bases antigas.
  await sql.transaction((tx) =>
    reordered.map(
      (id, position) => tx`UPDATE public.tracks SET position = ${position} WHERE id = ${id}`,
    ),
  );

  return true;
}
