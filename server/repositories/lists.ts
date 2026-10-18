import { sql } from '@/server/db';
import type { List, ListSummary } from '@/server/types';

export async function findListById(id: string): Promise<List | null> {
  const rows = await sql`
    SELECT id, user_id, title, is_public, is_favorite, created_at
    FROM public.lists
    WHERE id = ${id}
  `;
  return (rows[0] as List | undefined) ?? null;
}

export async function listSummariesByUser(userId: string): Promise<ListSummary[]> {
  const rows = await sql`
    SELECT
      l.id,
      l.user_id,
      l.title,
      l.is_public,
      l.is_favorite,
      l.created_at,
      COUNT(b.id)::int AS block_count
    FROM public.lists l
    LEFT JOIN public.blocks b ON b.list_id = l.id
    WHERE l.user_id = ${userId}
    GROUP BY l.id
    ORDER BY l.created_at ASC
  `;
  return rows as ListSummary[];
}

export async function insertList(input: {
  userId: string;
  title: string;
  isPublic?: boolean;
}): Promise<string> {
  const rows = await sql`
    INSERT INTO public.lists (user_id, title, is_public, is_favorite)
    VALUES (${input.userId}, ${input.title}, ${input.isPublic ?? true}, false)
    RETURNING id
  `;
  return (rows[0] as { id: string }).id;
}

export async function updateListById(
  id: string,
  input: { title: string; isPublic: boolean }
): Promise<void> {
  await sql`
    UPDATE public.lists
    SET title = ${input.title}, is_public = ${input.isPublic}
    WHERE id = ${id}
  `;
}

export async function deleteListById(id: string): Promise<void> {
  await sql`DELETE FROM public.lists WHERE id = ${id}`;
}

export async function findListIdByTrackId(trackId: string): Promise<string | null> {
  const rows = await sql`
    SELECT b.list_id
    FROM public.tracks t
    JOIN public.blocks b ON b.id = t.block_id
    WHERE t.id = ${trackId}
  `;
  return (rows[0] as { list_id: string } | undefined)?.list_id ?? null;
}
