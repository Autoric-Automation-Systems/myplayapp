'use server';
import { z } from 'zod';
import { sql } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Track } from './definitions';
import { fetchDataTrack } from './data';
import { fetchListIdByTrack } from '../lists/data';

const FormSchema = z.object({
  id: z.string(),
  block_id: z.string(),
  title: z.string(),
  key: z.string(),
  bpm: z.number(),
  style: z.string(),
  artist: z.string(),
  lyrics: z.string()
});

const CreateData = FormSchema.omit({ id: true });
const UpdateData = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    id?: string[];
    block_id?: string[];
    title?: string[];
  };
  message?: string | null;
};

export async function createData(formData: FormData) {
  const validatedFields = CreateData.safeParse({
    block_id: formData.get('block_id'),
    title: formData.get('title'),
    key: formData.get('key'),
    bpm: formData.get('bpm'),
    style: formData.get('style'),
    artist: formData.get('artist'),
    lyrics: formData.get('lyrics'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.',
    };
  }

  const { block_id, title, key, bpm, style, artist, lyrics } = validatedFields.data;

  try {
    await sql`
        INSERT INTO public.tracks ( block_id, title, key, bpm, style, artist, lyrics )
        VALUES (${block_id}, ${title}, ${key}, ${bpm}, ${style}, ${artist}, ${lyrics})
      `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to Create.' };
  }
}

export async function updateData(
  id: string,
  prevState: State,
  formData: FormData
) {
  //console.log('Received form data:', Object.fromEntries(formData.entries()));
  const validatedFields = UpdateData.safeParse({
    block_id: formData.get('block_id'),
    title: formData.get('title'),
    key: formData.get('key'),
    bpm: formData.get('bpm'),
    style: formData.get('style'),
    artist: formData.get('artist'),
    lyrics: formData.get('lyrics'),
  });

  if (!validatedFields.success) {
    //console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update.',
    };
  }

  const { title, key, bpm, style, artist, lyrics } = validatedFields.data;

  try {

    await sql`
        UPDATE public.devices
        SET title = ${title}, key = ${key}, bpm = ${bpm}, style = ${style}, artist = ${artist}, lyrics = ${lyrics}
        WHERE id = ${id}  
      `;
  } catch (error) {
    console.error('Database error:', error);
    return { message: 'Database Error: Failed to Update Track.' };
  }
}

export async function deleteTrack(id: string) {
  const track = await fetchDataTrack(id);
  const list_id = await fetchListIdByTrack({ block_id: track.block_id });

  await sql`DELETE FROM public.tracks WHERE id = ${id}`;
  revalidatePath(`/list/[${list_id}]`);
  redirect(
    `/list/${list_id}?title=Sucesso&message=A edição foi realizada com sucesso!&type=success`
  );
}

export async function addTrack(track: Track) {
  const list_id = await fetchListIdByTrack({ block_id: track.block_id });
  //console.log(track);
  try {
    await sql`
        INSERT INTO public.tracks ( block_id, title, key, bpm, style, artist, lyrics ) 
        VALUES (${track.block_id},  ${track.title} , ${track.key} , ${track.bpm} , ${track.style} , ${track.artist} , ${track.lyrics} )
      `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to Create.' };
  }
  revalidatePath(`/list/[${list_id}]`);
  redirect(
    `/list/${list_id}?title=Sucesso&message=A edição foi realizada com sucesso!&type=success`
  );

}


export async function editTrack(track: Track) {
  const list_id = await fetchListIdByTrack({ block_id: track.block_id });
  try {
    await sql`
        UPDATE public.tracks
        SET (title, key, bpm, style, artist, lyrics) = (${track.title}, ${track.key}, ${track.bpm}, ${track.style}, ${track.artist}, ${track.lyrics})
        WHERE id = ${track.id}
      `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to Edit.' };
  }
  revalidatePath(`/list/[${list_id}]`);
  redirect(
    `/list/${list_id}?title=Sucesso&message=A edição foi realizada com sucesso!&type=success`
  );
}