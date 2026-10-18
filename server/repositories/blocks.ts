import { sql } from '@/server/db';
import type { Block, BlockWithTracks, Timestamp } from '@/server/types';

type BlockWithTrackRows = {
  block_id: string;
  list_id: string;
  block_title: string;
  position: number;
  block_created_at: Timestamp;
  track_id: string | null;
  track_title: string | null;
  key: string | null;
  bpm: number | null;
  style: string | null;
  artist: string | null;
  lyrics: string | null;
  track_created_at: Timestamp | null;
};

export async function findBlockById(id: string): Promise<Block | null> {
  const rows = await sql`
    SELECT id, list_id, title, position, created_at
    FROM public.blocks
    WHERE id = ${id}
  `;
  return (rows[0] as Block | undefined) ?? null;
}

export async function insertBlock(input: { listId: string; title: string }): Promise<void> {
  await sql`
    INSERT INTO public.blocks (list_id, title, position)
    VALUES (
      ${input.listId},
      ${input.title},
      (SELECT COALESCE(MAX(position), -1) + 1 FROM public.blocks WHERE list_id = ${input.listId})
    )
  `;
}

export async function updateBlockById(id: string, input: { title: string }): Promise<void> {
  await sql`
    UPDATE public.blocks
    SET title = ${input.title}
    WHERE id = ${id}
  `;
}

export async function deleteBlockById(id: string): Promise<void> {
  await sql`DELETE FROM public.blocks WHERE id = ${id}`;
}

export async function blocksWithTracks(listId: string): Promise<BlockWithTracks[]> {
  const rows = (await sql`
    SELECT
      b.id             AS block_id,
      b.list_id,
      b.title          AS block_title,
      b.position,
      b.created_at     AS block_created_at,
      t.id             AS track_id,
      t.title          AS track_title,
      t.key,
      t.bpm,
      t.style,
      t.artist,
      t.lyrics,
      t.created_at     AS track_created_at
    FROM public.blocks b
    LEFT JOIN public.tracks t ON t.block_id = b.id
    WHERE b.list_id = ${listId}
    ORDER BY b.position ASC, b.created_at ASC, t.created_at ASC
  `) as BlockWithTrackRows[];

  const blocks = new Map<string, BlockWithTracks>();

  for (const row of rows) {
    let block = blocks.get(row.block_id);
    if (!block) {
      block = {
        id: row.block_id,
        list_id: row.list_id,
        title: row.block_title,
        position: row.position,
        created_at: row.block_created_at,
        tracks: [],
      };
      blocks.set(row.block_id, block);
    }

    if (row.track_id) {
      block.tracks.push({
        id: row.track_id,
        block_id: row.block_id,
        title: row.track_title ?? '',
        key: row.key ?? '',
        bpm: row.bpm ?? 0,
        style: row.style ?? '',
        artist: row.artist ?? '',
        lyrics: row.lyrics ?? '',
        created_at: row.track_created_at ?? row.block_created_at,
      });
    }
  }

  return [...blocks.values()];
}
