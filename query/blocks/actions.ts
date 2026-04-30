'use server';
import { z } from 'zod';
import { sql } from '@/lib/db';
import { Block } from './definitions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { fetchDataBlock } from './data';

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
        INSERT INTO public.blocks ( block_id, title, key, bpm, style, artist, lyrics )
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
    return { message: 'Database Error: Failed to Update Block.' };
  }
}

export async function deleteBlock(id: string) {
  const block = await fetchDataBlock(id);
  await sql`DELETE FROM public.blocks WHERE id = ${id}`;
  revalidatePath(`/list/[${block.list_id}]`);
  redirect(
    `/list/${block.list_id}?title=Sucesso&message=A exclusão foi realizada com sucesso!&type=success`
  );

}

export async function addBlock(block: Block) {
  console.log(block);
  try {
    await sql`
        INSERT INTO public.blocks ( list_id, title, position) 
        VALUES (${block.list_id}, ${block.title} , ${block.position})
      `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to Create.' };
  }
  revalidatePath(`/list/[${block.list_id}]`);
  redirect(
    `/list/${block.list_id}?title=Sucesso&message=A edição foi realizada com sucesso!&type=success`
  );

}


export async function editBlock(block: Block) {
  //console.log(block);
  try {
    await sql`
        UPDATE public.blocks
        SET (title, position) = (${block.title}, ${block.position})
        WHERE id = ${block.id}
      `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to Edit.' };
  }
  revalidatePath(`/list/[${block.list_id}]`);
  redirect(
    `/list/${block.list_id}?title=Sucesso&message=A edição foi realizada com sucesso!&type=success`
  );
}