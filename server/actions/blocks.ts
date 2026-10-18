'use server';

import { revalidatePath } from 'next/cache';
import { blockInputSchema } from '@/server/schemas/block';
import { parseId } from '@/server/schemas/common';
import {
  actionError,
  validationError,
  withMessage,
  type ActionResult,
} from '@/server/action-result';
import * as repertoire from '@/server/services/repertoire';

export async function createBlock(listId: unknown, input: unknown): Promise<ActionResult> {
  const parentId = parseId(listId);
  if (!parentId) return { ok: false, error: 'Identificador inválido.' };

  const parsed = blockInputSchema.safeParse(input);
  if (!parsed.success) return validationError(parsed.error);

  try {
    await repertoire.createBlock(parentId, parsed.data);
  } catch (error) {
    return actionError(error);
  }

  revalidatePath(`/list/${parentId}`);
  return withMessage(`/list/${parentId}`, 'Sucesso', 'O bloco foi criado com sucesso!');
}

export async function updateBlock(id: unknown, input: unknown): Promise<ActionResult> {
  const blockId = parseId(id);
  if (!blockId) return { ok: false, error: 'Identificador inválido.' };

  const parsed = blockInputSchema.safeParse(input);
  if (!parsed.success) return validationError(parsed.error);

  let listId: string;
  try {
    listId = await repertoire.updateBlock(blockId, parsed.data);
  } catch (error) {
    return actionError(error);
  }

  revalidatePath(`/list/${listId}`);
  return withMessage(`/list/${listId}`, 'Sucesso', 'A edição foi realizada com sucesso!');
}

export async function deleteBlock(id: unknown): Promise<ActionResult> {
  const blockId = parseId(id);
  if (!blockId) return { ok: false, error: 'Identificador inválido.' };

  let listId: string;
  try {
    listId = await repertoire.removeBlock(blockId);
  } catch (error) {
    return actionError(error);
  }

  revalidatePath(`/list/${listId}`);
  return withMessage(`/list/${listId}`, 'Sucesso', 'O bloco foi removido com sucesso!');
}
