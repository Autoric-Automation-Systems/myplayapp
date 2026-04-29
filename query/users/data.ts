import { sql } from '@/lib/db';
import { User } from './definitions';

export async function fetchDataUser(email: string) {
  try {
    const data = await sql`
      SELECT *
      FROM public.users
      WHERE users.email = ${email}
      ORDER BY name ASC
    `;
    const user = data[0];
    return user as User;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all users.');
  }
}