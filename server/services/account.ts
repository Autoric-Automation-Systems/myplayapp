import { requireUser } from '@/server/session';
import { deleteUserById } from '@/server/repositories/users';

export async function deleteAccount(): Promise<void> {
  const user = await requireUser();
  await deleteUserById(user.id);
}
