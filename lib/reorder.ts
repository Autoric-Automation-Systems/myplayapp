export type MoveDirection = 'up' | 'down';

/**
 * Devolve a sequência com o item trocado pelo vizinho, ou `null` quando o item
 * não existe ou já está no extremo. A cópia evita mutar a lista lida do banco.
 */
export function moveInSequence(
  ids: readonly string[],
  id: string,
  direction: MoveDirection,
): string[] | null {
  const index = ids.indexOf(id);
  if (index === -1) return null;

  const target = index + (direction === 'up' ? -1 : 1);
  if (target < 0 || target >= ids.length) return null;

  const next = [...ids];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}
