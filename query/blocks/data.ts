import { sql } from '@/lib/db';
import { Block } from './definitions';

export async function fetchDataBlocks(list_id: string) {
  try {
    const data = await sql`
      SELECT *
      FROM public.blocks
      WHERE blocks.list_id = ${list_id}
      ORDER BY created_at ASC
    `;
    const blocks = data;
    return blocks as Block[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all blocks.');
  }
}

export async function fetchDataBlockCount(list_id: string) {
  try {
    const data = await sql`
      SELECT COUNT(*) as count
      FROM public.blocks
      WHERE blocks.list_id = ${list_id}
    `;
    const count = data[0].count as number;
    return count;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch block count.');
  }
}