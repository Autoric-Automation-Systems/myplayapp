import { describe, expect, it } from 'vitest';
import { shouldRunOutsideTransaction, splitSqlStatements } from '../scripts/sql-statements.mjs';

describe('splitSqlStatements', () => {
  it('separa comandos por ponto e vírgula', () => {
    expect(splitSqlStatements('CREATE TABLE a ();\nCREATE TABLE b ();')).toEqual([
      'CREATE TABLE a ()',
      'CREATE TABLE b ()',
    ]);
  });

  it('não quebra função com corpo em dollar-quoting', () => {
    const sql = [
      'CREATE FUNCTION f() RETURNS trigger AS $$',
      'BEGIN',
      '  NEW.updated_at := now();',
      '  RETURN NEW;',
      'END;',
      '$$ LANGUAGE plpgsql;',
      'SELECT 1;',
    ].join('\n');

    const statements = splitSqlStatements(sql);

    expect(statements).toHaveLength(2);
    expect(statements[0]).toContain('END;');
    expect(statements[1]).toBe('SELECT 1');
  });

  it('aceita tag nomeada em dollar-quoting', () => {
    const sql = 'CREATE FUNCTION g() RETURNS int AS $fn$ SELECT 1; $fn$ LANGUAGE sql;';
    expect(splitSqlStatements(sql)).toHaveLength(1);
  });

  it('ignora ponto e vírgula dentro de string', () => {
    expect(splitSqlStatements("INSERT INTO t VALUES ('a;b'); SELECT 2;")).toEqual([
      "INSERT INTO t VALUES ('a;b')",
      'SELECT 2',
    ]);
  });

  it('trata aspas escapadas por duplicação', () => {
    expect(splitSqlStatements("SELECT 'it''s; fine';")).toEqual(["SELECT 'it''s; fine'"]);
  });

  it('ignora ponto e vírgula em comentários', () => {
    const sql = [
      '-- comentário; com ponto e vírgula',
      'SELECT 1;',
      '/* bloco; */',
      'SELECT 2;',
    ].join('\n');

    expect(splitSqlStatements(sql)).toEqual(['SELECT 1', 'SELECT 2']);
  });

  it('mantém identificadores entre aspas duplas', () => {
    expect(splitSqlStatements('CREATE TABLE "a;b" ();')).toEqual(['CREATE TABLE "a;b" ()']);
  });

  it('descarta comandos vazios e o ; final', () => {
    expect(splitSqlStatements(';;\nSELECT 1;\n\n')).toEqual(['SELECT 1']);
  });

  it('devolve lista vazia para arquivo vazio', () => {
    expect(splitSqlStatements('')).toEqual([]);
    expect(splitSqlStatements('\n\n-- nada aqui\n')).toEqual([]);
  });
});

describe('shouldRunOutsideTransaction', () => {
  it('detecta o marcador de comando não transacional', () => {
    expect(shouldRunOutsideTransaction('-- migrate:no-transaction\nCREATE INDEX;')).toBe(true);
    expect(shouldRunOutsideTransaction('CREATE TABLE a ();')).toBe(false);
  });
});
