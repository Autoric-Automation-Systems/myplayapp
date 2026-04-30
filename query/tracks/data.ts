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
    //console.log("Tracks", tracks);
    return tracks as Track[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all tracks.');
  }
}

export async function fetchDataTrack(id: string) {
  try {
    const data = await sql`
      SELECT *
      FROM public.tracks
      WHERE tracks.id = ${id}
    `;
    const track = data[0];
    //console.log("Track", track);
    return track as Track;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch track.');
  }
}