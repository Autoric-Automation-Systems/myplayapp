import { cache } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/server/auth';
import { findUserByEmail } from '@/server/repositories/users';
import type { User } from '@/server/types';

export const getCurrentUser = cache(async (): Promise<User | null> => {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return null;

  return findUserByEmail(email);
});

export const requireUser = cache(async (): Promise<User> => {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return user;
});
