'use server';

import { revalidatePath } from 'next/cache';
import { actionError, withMessage, type ActionResult } from '@/server/action-result';
import * as account from '@/server/services/account';

export async function deleteAccount(): Promise<ActionResult> {
  try {
    await account.deleteAccount();
  } catch (error) {
    return actionError(error);
  }

  revalidatePath('/');
  return withMessage('/', 'Sucesso', 'A conta foi deletada com sucesso!');
}
