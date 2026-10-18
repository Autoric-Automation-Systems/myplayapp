/**
 * Divide um arquivo SQL em comandos individuais respeitando strings, identificadores
 * entre aspas, dollar-quoting e comentários. Um `;` só termina o comando no nível
 * mais externo — dentro de `$$ ... $$` ou de `'...'` ele é conteúdo.
 *
 * @param {string} source
 * @returns {string[]}
 */
export function splitSqlStatements(source) {
  /** @type {string[]} */
  const statements = [];
  let buffer = '';
  let i = 0;

  while (i < source.length) {
    const char = source[i];

    if (char === '-' && source[i + 1] === '-') {
      const end = source.indexOf('\n', i);
      i = end === -1 ? source.length : end;
      buffer += ' ';
      continue;
    }

    if (char === '/' && source[i + 1] === '*') {
      let depth = 1;
      i += 2;
      while (i < source.length && depth > 0) {
        if (source[i] === '/' && source[i + 1] === '*') {
          depth += 1;
          i += 2;
        } else if (source[i] === '*' && source[i + 1] === '/') {
          depth -= 1;
          i += 2;
        } else {
          i += 1;
        }
      }
      buffer += ' ';
      continue;
    }

    if (char === "'") {
      // E'...' permite escape com barra invertida; strings normais só escapam com ''.
      const usesBackslashEscapes = /(?:^|[^A-Za-z0-9_])[eE]$/.test(buffer);
      buffer += char;
      i += 1;
      while (i < source.length) {
        const current = source[i];
        if (usesBackslashEscapes && current === '\\') {
          buffer += current + (source[i + 1] ?? '');
          i += 2;
          continue;
        }
        if (current === "'") {
          if (source[i + 1] === "'") {
            buffer += "''";
            i += 2;
            continue;
          }
          buffer += current;
          i += 1;
          break;
        }
        buffer += current;
        i += 1;
      }
      continue;
    }

    if (char === '"') {
      buffer += char;
      i += 1;
      while (i < source.length) {
        const current = source[i];
        if (current === '"') {
          if (source[i + 1] === '"') {
            buffer += '""';
            i += 2;
            continue;
          }
          buffer += current;
          i += 1;
          break;
        }
        buffer += current;
        i += 1;
      }
      continue;
    }

    if (char === '$') {
      const tag = /^\$([A-Za-z_][A-Za-z0-9_]*)?\$/.exec(source.slice(i));
      if (tag) {
        const delimiter = tag[0];
        const end = source.indexOf(delimiter, i + delimiter.length);
        if (end !== -1) {
          buffer += source.slice(i, end + delimiter.length);
          i = end + delimiter.length;
          continue;
        }
      }
    }

    if (char === ';') {
      const statement = buffer.trim();
      if (statement) statements.push(statement);
      buffer = '';
      i += 1;
      continue;
    }

    buffer += char;
    i += 1;
  }

  const tail = buffer.trim();
  if (tail) statements.push(tail);

  return statements;
}

export const NO_TRANSACTION_MARKER = '-- migrate:no-transaction';

/**
 * @param {string} source
 * @returns {boolean}
 */
export function shouldRunOutsideTransaction(source) {
  return source.includes(NO_TRANSACTION_MARKER);
}
