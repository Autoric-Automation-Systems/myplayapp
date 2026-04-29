'use server';
import { z } from 'zod';
import { sql } from '@/lib/db';

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
  await sql`DELETE FROM public.tracks WHERE id = ${id}`;
}