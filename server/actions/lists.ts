'use server';

import { revalidatePath } from 'next/cache';
import { listCreateSchema, listUpdateSchema } from '@/server/schemas/list';
import { parseId } from '@/server/schemas/common';
import {
  actionError,
  validationError,
  withMessage,
  type ActionResult,
} from '@/server/action-result';
import * as repertoire from '@/server/services/repertoire';

export async function createList(input: unknown): Promise<ActionResult> {
  const parsed = listCreateSchema.safeParse(input);
  if (!parsed.success) return validationError(parsed.error);

  try {
    await repertoire.createList(parsed.data);
  } catch (error) {
    return actionError(error);
  }

  revalidatePath('/dashboard');
  return withMessage('/dashboard', 'Sucesso', 'O repertório foi criado com sucesso!');
}

export async function updateList(id: unknown, input: unknown): Promise<ActionResult> {
  const listId = parseId(id);
  if (!listId) return { ok: false, error: 'Identificador inválido.' };

  const parsed = listUpdateSchema.safeParse(input);
  if (!parsed.success) return validationError(parsed.error);

  try {
    await repertoire.updateList(listId, parsed.data);
  } catch (error) {
    return actionError(error);
  }

  revalidatePath('/dashboard');
  revalidatePath(`/list/${listId}`);
  return withMessage(`/list/${listId}`, 'Sucesso', 'A edição foi realizada com sucesso!');
}

export async function deleteList(id: unknown): Promise<ActionResult> {
  const listId = parseId(id);
  if (!listId) return { ok: false, error: 'Identificador inválido.' };

  try {
    await repertoire.removeList(listId);
  } catch (error) {
    return actionError(error);
  }

  revalidatePath('/dashboard');
  return withMessage('/dashboard', 'Sucesso', 'O repertório foi deletado com sucesso!');
}
