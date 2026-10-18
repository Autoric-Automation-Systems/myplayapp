import { describe, expect, it } from 'vitest';
import { buildPixPayload, crc16 } from '../lib/pix';
import { moveInSequence } from '../lib/reorder';

describe('moveInSequence', () => {
  const ids = ['a', 'b', 'c'];

  it('troca com o vizinho de cima', () => {
    expect(moveInSequence(ids, 'b', 'up')).toEqual(['b', 'a', 'c']);
  });

  it('troca com o vizinho de baixo', () => {
    expect(moveInSequence(ids, 'b', 'down')).toEqual(['a', 'c', 'b']);
  });

  it('não move além dos extremos', () => {
    expect(moveInSequence(ids, 'a', 'up')).toBeNull();
    expect(moveInSequence(ids, 'c', 'down')).toBeNull();
  });

  it('devolve null para id inexistente e lista vazia', () => {
    expect(moveInSequence(ids, 'zz', 'up')).toBeNull();
    expect(moveInSequence([], 'a', 'down')).toBeNull();
  });

  it('não muta a lista recebida', () => {
    const original = [...ids];
    moveInSequence(ids, 'a', 'down');
    expect(ids).toEqual(original);
  });
});

describe('buildPixPayload', () => {
  it('gera BR Code com CRC de 4 dígitos válido', () => {
    const payload = buildPixPayload();

    expect(payload.startsWith('000201')).toBe(true);
    expect(payload).toContain('0014br.gov.bcb.pix');
    expect(payload).toContain('5303986');
    expect(payload).toContain('5802BR');
    expect(payload.slice(-8, -4)).toBe('6304');
    expect(payload.slice(-4)).toBe(crc16(payload.slice(0, -4)));
    expect(payload.slice(-4)).toMatch(/^[0-9A-F]{4}$/);
  });

  it('codifica o tamanho da chave com dois dígitos', () => {
    expect(buildPixPayload('12345678900')).toContain('011112345678900');
  });

  it('respeita a chave informada', () => {
    expect(buildPixPayload('chave-de-teste')).toContain('chave-de-teste');
  });
});
