import { cache } from 'react';
import { notFound } from 'next/navigation';
import { requireBlockOwner, requireListOwner, requireTrackOwner } from '@/server/authz';
import { requireUser } from '@/server/session';
import { parseId } from '@/server/schemas/common';
import type { ListCreateInput, ListUpdateInput } from '@/server/schemas/list';
import type { BlockInput } from '@/server/schemas/block';
import type { TrackInput } from '@/server/schemas/track';
import type { ListDetail, ListSummary, PublicListDetail } from '@/server/types';
import {
  deleteListById,
  findListById,
  insertList,
  listSummariesByUser,
  updateListById,
} from '@/server/repositories/lists';
import {
  blocksWithTracks,
  deleteBlockById,
  insertBlock,
  moveBlockWithinList,
  updateBlockById,
} from '@/server/repositories/blocks';
import {
  deleteTrackById,
  insertTrack,
  moveTrackWithinBlock,
  updateTrackById,
} from '@/server/repositories/tracks';
import { findPublicUserById } from '@/server/repositories/users';

export async function getDashboardLists(): Promise<ListSummary[]> {
  const user = await requireUser();
  return listSummariesByUser(user.id);
}

export async function getOwnedListDetail(listId: string): Promise<ListDetail> {
  const user = await requireUser();
  const id = parseId(listId);
  if (!id) notFound();

  const list = await findListById(id);

  if (!list || list.user_id !== user.id) notFound();

  return { list, blocks: await blocksWithTracks(list.id) };
}

export const getPublicListDetail = cache(
  async (listId: string): Promise<PublicListDetail | null> => {
    const id = parseId(listId);
    if (!id) return null;

    const list = await findListById(id);
    if (!list || !list.is_public) return null;

    const [blocks, owner] = await Promise.all([
      blocksWithTracks(list.id),
      findPublicUserById(list.user_id),
    ]);

    return { list, blocks, owner };
  }
);

export async function createList(input: ListCreateInput): Promise<void> {
  const user = await requireUser();
  await insertList({ userId: user.id, title: input.title, isPublic: input.is_public });
}

export async function updateList(id: string, input: ListUpdateInput): Promise<void> {
  await requireListOwner(id);
  await updateListById(id, { title: input.title, isPublic: input.is_public });
}

export async function removeList(id: string): Promise<void> {
  await requireListOwner(id);
  await deleteListById(id);
}

export async function createBlock(listId: string, input: BlockInput): Promise<string> {
  const list = await requireListOwner(listId);
  await insertBlock({ listId: list.id, title: input.title });
  return list.id;
}

export async function updateBlock(id: string, input: BlockInput): Promise<string> {
  const { block, list } = await requireBlockOwner(id);
  await updateBlockById(block.id, { title: input.title });
  return list.id;
}

export async function removeBlock(id: string): Promise<string> {
  const { block, list } = await requireBlockOwner(id);
  await deleteBlockById(block.id);
  return list.id;
}

export async function moveBlock(id: string, direction: 'up' | 'down'): Promise<string> {
  const { block, list } = await requireBlockOwner(id);
  await moveBlockWithinList(list.id, block.id, direction);
  return list.id;
}

export async function createTrack(blockId: string, input: TrackInput): Promise<string> {
  const { block, list } = await requireBlockOwner(blockId);
  await insertTrack(block.id, input);
  return list.id;
}

export async function updateTrack(id: string, input: TrackInput): Promise<string> {
  const { track, list } = await requireTrackOwner(id);
  await updateTrackById(track.id, input);
  return list.id;
}

export async function removeTrack(id: string): Promise<string> {
  const { track, list } = await requireTrackOwner(id);
  await deleteTrackById(track.id);
  return list.id;
}

export async function moveTrack(id: string, direction: 'up' | 'down'): Promise<string> {
  const { track, list } = await requireTrackOwner(id);
  await moveTrackWithinBlock(track.block_id, track.id, direction);
  return list.id;
}
