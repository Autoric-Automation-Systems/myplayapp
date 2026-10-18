import { requireUser } from '@/server/session';
import { ForbiddenError, NotFoundError } from '@/server/errors';
import { findBlockById } from '@/server/repositories/blocks';
import { findListById, findListIdByTrackId } from '@/server/repositories/lists';
import { findTrackById } from '@/server/repositories/tracks';
import type { Block, List, Track } from '@/server/types';
import { parseId } from '@/server/schemas/common';

export async function requireListOwner(listId: string): Promise<List> {
  const user = await requireUser();
  const id = parseId(listId);
  if (!id) throw new NotFoundError('Repertório não encontrado.');

  const list = await findListById(id);

  if (!list) throw new NotFoundError('Repertório não encontrado.');
  if (list.user_id !== user.id) {
    throw new ForbiddenError('Você não tem acesso a este repertório.');
  }

  return list;
}

export async function requireBlockOwner(
  blockId: string
): Promise<{ block: Block; list: List }> {
  const id = parseId(blockId);
  if (!id) throw new NotFoundError('Bloco não encontrado.');

  const block = await findBlockById(id);
  if (!block) throw new NotFoundError('Bloco não encontrado.');

  const list = await requireListOwner(block.list_id);
  return { block, list };
}

export async function requireTrackOwner(
  trackId: string
): Promise<{ track: Track; list: List }> {
  const id = parseId(trackId);
  if (!id) throw new NotFoundError('Música não encontrada.');

  const track = await findTrackById(id);
  if (!track) throw new NotFoundError('Música não encontrada.');

  const listId = await findListIdByTrackId(track.id);
  if (!listId) throw new NotFoundError('Música não encontrada.');

  const list = await requireListOwner(listId);
  return { track, list };
}
