import { sql } from '@/lib/db';
import { List } from './definitions';

export async function fetchDataLists(user_id: string) {
  try {
    const data = await sql`
      SELECT *
      FROM public.lists
      WHERE lists.user_id = ${user_id}
      ORDER BY created_at ASC
    `;
    const lists = data;
    return lists as List[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all lists.');
  }
}

export async function fetchDataList(id: string) {
  try {
    const data = await sql`
      SELECT *
      FROM public.lists
      WHERE lists.id = ${id}
    `;
    const list = data[0];
    return list as List;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch list.');
  }
}

export async function checkIsPublic(id: string) {
  try {
    const data = await sql`
      SELECT is_public
      FROM public.lists
      WHERE lists.id = ${id}
    `;
    const isPublic = data[0].is_public as boolean;
    return isPublic;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch list.');
  }
}

export async function fetchListIdByTrack({ block_id }: { block_id: string }) {
  //console.log("block_id", block_id);
  try {
    const data = await sql`
      SELECT l.id
      FROM public.lists l
      JOIN public.blocks b 
      ON l.id = b.list_id
      WHERE b.id = ${block_id}
    `;
    const listId = data[0].id as string;
    //console.log("listId", listId);
    return listId;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch list.');
  }

}