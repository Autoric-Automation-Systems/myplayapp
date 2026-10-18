'use server';

import { revalidatePath } from 'next/cache';
import { trackInputSchema } from '@/server/schemas/track';
import { parseId } from '@/server/schemas/common';
import {
  actionError,
  validationError,
  withMessage,
  type ActionResult,
} from '@/server/action-result';
import * as repertoire from '@/server/services/repertoire';

export async function createTrack(blockId: unknown, input: unknown): Promise<ActionResult> {
  const parentId = parseId(blockId);
  if (!parentId) return { ok: false, error: 'Identificador inválido.' };

  const parsed = trackInputSchema.safeParse(input);
  if (!parsed.success) return validationError(parsed.error);

  let listId: string;
  try {
    listId = await repertoire.createTrack(parentId, parsed.data);
  } catch (error) {
    return actionError(error);
  }

  revalidatePath(`/list/${listId}`);
  return withMessage(`/list/${listId}`, 'Sucesso', 'A música foi adicionada com sucesso!');
}

export async function updateTrack(id: unknown, input: unknown): Promise<ActionResult> {
  const trackId = parseId(id);
  if (!trackId) return { ok: false, error: 'Identificador inválido.' };

  const parsed = trackInputSchema.safeParse(input);
  if (!parsed.success) return validationError(parsed.error);

  let listId: string;
  try {
    listId = await repertoire.updateTrack(trackId, parsed.data);
  } catch (error) {
    return actionError(error);
  }

  revalidatePath(`/list/${listId}`);
  return withMessage(`/list/${listId}`, 'Sucesso', 'A edição foi realizada com sucesso!');
}

export async function deleteTrack(id: unknown): Promise<ActionResult> {
  const trackId = parseId(id);
  if (!trackId) return { ok: false, error: 'Identificador inválido.' };

  let listId: string;
  try {
    listId = await repertoire.removeTrack(trackId);
  } catch (error) {
    return actionError(error);
  }

  revalidatePath(`/list/${listId}`);
  return withMessage(`/list/${listId}`, 'Sucesso', 'A música foi removida com sucesso!');
}

export async function moveTrack(id: unknown, direction: unknown): Promise<ActionResult> {
  const trackId = parseId(id);
  if (!trackId) return { ok: false, error: 'Identificador inválido.' };
  if (direction !== 'up' && direction !== 'down') {
    return { ok: false, error: 'Direção inválida.' };
  }

  let listId: string;
  try {
    listId = await repertoire.moveTrack(trackId, direction);
  } catch (error) {
    return actionError(error);
  }

  revalidatePath(`/list/${listId}`);
  return { ok: true };
}
