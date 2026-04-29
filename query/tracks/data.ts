import { sql } from '@/lib/db';
import { Track } from './definitions';

export async function fetchDataTracks(block_id: string) {
  try {
    const data = await sql`
      SELECT *
      FROM public.tracks
      WHERE tracks.block_id = ${block_id}
      ORDER BY created_at ASC
    `;
    const tracks = data;
    return tracks as Track[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all tracks.');
  }
}