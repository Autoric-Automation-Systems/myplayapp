import { sql } from '@/server/db';
import type { User } from '@/server/types';

export async function findUserByEmail(email: string): Promise<User | null> {
  const rows = await sql`
    SELECT id, name, email, picture, created_at
    FROM public.users
    WHERE lower(email) = lower(${email})
    LIMIT 1
  `;
  return (rows[0] as User | undefined) ?? null;
}

export async function findUserById(id: string): Promise<User | null> {
  const rows = await sql`
    SELECT id, name, email, picture, created_at
    FROM public.users
    WHERE id = ${id}
  `;
  return (rows[0] as User | undefined) ?? null;
}

export async function upsertGoogleUser(input: {
  name: string;
  email: string;
  picture: string | null;
}): Promise<void> {
  await sql`
    INSERT INTO public.users (name, email, picture)
    VALUES (${input.name}, ${input.email}, ${input.picture})
    ON CONFLICT (email) DO UPDATE
    SET name = EXCLUDED.name, picture = EXCLUDED.picture
  `;
}

export async function deleteUserById(id: string): Promise<void> {
  await sql`DELETE FROM public.users WHERE id = ${id}`;
}
