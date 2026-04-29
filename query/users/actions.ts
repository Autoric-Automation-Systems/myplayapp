'use server';
import { z } from 'zod';
import { sql } from '@/lib/db';
import bcrypt from 'bcryptjs';

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().optional(),
  password: z.string(),
  picture: z.string().optional(),
});

const CreateData = FormSchema.omit({ id: true });
const UpdateData = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
  };
  message?: string | null;
};

export async function createData(prevState: State, formData: FormData) {
  const validatedFields = CreateData.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    picture: formData.get('picture'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.',
    };
  }
  const { name, email, password, picture } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
        INSERT INTO public.users ( name, email, password, picture ) )
        VALUES (${name}, ${email}, ${hashedPassword}, ${picture} )
        `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create.',
    };
  }
}

export async function updateData(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateData.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    picture: formData.get('picture'),
  });


  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update.',
    };
  }

  const { name, email, password, picture } = validatedFields.data;

  try {
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await sql`
        UPDATE public.users
        SET name = ${name}, email = ${email}, password = ${hashedPassword}, picture = ${picture}}
        WHERE id = ${id}
      `;
    } else {
      await sql`
        UPDATE public.users
        SET name = ${name}, email = ${email}, picture = ${picture}
        WHERE id = ${id}
      `;
    }
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to Update User.' };
  }
}

export async function updateUserPassword(id: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
    UPDATE public.users 
    SET password = ${hashedPassword} 
    WHERE id = ${id}
  `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to Update User.' };
  }
}

export async function deleteData(id: string) {
  await sql`DELETE FROM public.users WHERE id = ${id}`;
}