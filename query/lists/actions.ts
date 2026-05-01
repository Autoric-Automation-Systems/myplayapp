'use server';
import { z } from 'zod';
import { sql } from '@/lib/db';
import { List } from './definitions';
import { CurrentUser } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  list_id: z.string(),
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
    list_id?: string[];
    title?: string[];
  };
  message?: string | null;
};

export async function createData(formData: FormData) {
  const validatedFields = CreateData.safeParse({
    list_id: formData.get('list_id'),
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

  const { list_id, title, key, bpm, style, artist, lyrics } = validatedFields.data;

  try {
    await sql`
        INSERT INTO public.lists ( list_id, title, key, bpm, style, artist, lyrics )
        VALUES (${list_id}, ${title}, ${key}, ${bpm}, ${style}, ${artist}, ${lyrics})
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
    list_id: formData.get('list_id'),
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
    return { message: 'Database Error: Failed to Update List.' };
  }
}

export async function deleteList(id: string) {
  await sql`DELETE FROM public.lists WHERE id = ${id}`;
  revalidatePath('/dashboard');
  redirect(
    '/dashboard?title=Sucesso&message=O repertório foi deletado com sucesso!&type=success'
  );
}

export async function addList(list: List) {
  const user = await CurrentUser();
  if (!user) return null;
  try {
    await sql`
        INSERT INTO public.lists ( user_id, title, is_public, is_favorite) 
        VALUES (${user.id}, ${list.title}, ${list.is_public}, ${list.is_favorite})
      `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to Create.' };
  }
  revalidatePath('/dashboard');
  redirect(
    '/dashboard?title=Sucesso&message=A criação foi realizada com sucesso!&type=success'
  );
}

export async function editList(list: List) {
  try {
    await sql`
        UPDATE public.lists
        SET (user_id, title, is_public, is_favorite) = (${list.user_id}, ${list.title}, ${list.is_public}, ${list.is_favorite})
        WHERE id = ${list.id}
      `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to Create.' };
  }
  revalidatePath(`/list/[${list.id}]`);
  redirect(
    `/list/${list.id}?title=Sucesso&message=A edição foi realizada com sucesso!&type=success`
  );
}