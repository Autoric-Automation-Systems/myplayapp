import { sql } from '@/server/db';
import type { User } from '@/server/types';

export async function findUserByEmail(email: string): Promise<User | null> {
  const rows = await sql`
    SELECT id, name, email, picture, created_at
    FROM public.users
    WHERE lower(email) = lower(${email})
    ORDER BY created_at ASC
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

// A base de produção foi criada antes da migration e não tem índice único em
// `email`, então ON CONFLICT (email) falha. UPDATE + INSERT funciona nos dois casos.
export async function upsertGoogleUser(input: {
  name: string;
  email: string;
  picture: string | null;
}): Promise<User> {
  const updated = await sql`
    UPDATE public.users
    SET name = ${input.name}, picture = ${input.picture}
    WHERE lower(email) = lower(${input.email})
    RETURNING id, name, email, picture, created_at
  `;
  if (updated[0]) return updated[0] as User;

  try {
    const inserted = await sql`
      INSERT INTO public.users (name, email, picture)
      VALUES (${input.name}, ${input.email}, ${input.picture})
      RETURNING id, name, email, picture, created_at
    `;
    return inserted[0] as User;
  } catch (error) {
    // Dois logins simultâneos: a outra requisição inseriu primeiro.
    const existing = await findUserByEmail(input.email);
    if (existing) return existing;
    throw error;
  }
}

export async function deleteUserById(id: string): Promise<void> {
  await sql`DELETE FROM public.users WHERE id = ${id}`;
}
