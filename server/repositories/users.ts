import { sql } from '@/server/db';
import type { ListOwner, User } from '@/server/types';

export async function findUserByEmail(email: string): Promise<User | null> {
  const rows = await sql`
    SELECT id, name, email, picture, created_at
    FROM public.users
    WHERE lower(email) = lower(${email})
    LIMIT 1
  `;
  return (rows[0] as User | undefined) ?? null;
}

export async function findPublicUserById(id: string): Promise<ListOwner | null> {
  const rows = await sql`
    SELECT id, name, picture
    FROM public.users
    WHERE id = ${id}
  `;
  return (rows[0] as ListOwner | undefined) ?? null;
}

export async function findUserById(id: string): Promise<User | null> {
  const rows = await sql`
    SELECT id, name, email, picture, created_at
    FROM public.users
    WHERE id = ${id}
  `;
  return (rows[0] as User | undefined) ?? null;
}

// Depende do índice único `users_email_lower_key` (migration 0003). Antes dele
// existia um UPDATE + INSERT manual para conviver com bases sem índice único.
export async function upsertGoogleUser(input: {
  name: string;
  email: string;
  picture: string | null;
}): Promise<User> {
  const rows = await sql`
    INSERT INTO public.users (name, email, picture)
    VALUES (${input.name}, ${input.email}, ${input.picture})
    ON CONFLICT ((lower(email)))
    DO UPDATE SET name = EXCLUDED.name, picture = EXCLUDED.picture
    RETURNING id, name, email, picture, created_at
  `;
  return rows[0] as User;
}

export async function deleteUserById(id: string): Promise<void> {
  await sql`DELETE FROM public.users WHERE id = ${id}`;
}
