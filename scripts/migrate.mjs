import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { neon } from '@neondatabase/serverless';
import { shouldRunOutsideTransaction, splitSqlStatements } from './sql-statements.mjs';

async function loadEnv() {
  if (process.env.DATABASE_URL) return;

  for (const file of ['.env.local', '.env']) {
    if (!existsSync(file)) continue;

    const content = await readFile(file, 'utf8');
    for (const line of content.split('\n')) {
      const match = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!match) continue;

      const [, key, raw] = match;
      if (process.env[key]) continue;
      process.env[key] = raw.replace(/^['"]|['"]$/g, '');
    }
  }
}

await loadEnv();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL não configurada. Crie um .env.local a partir do .env.example.');
  process.exit(1);
}

const sql = neon(connectionString);
const migrationsDir = path.join(process.cwd(), 'db', 'migrations');

await sql`
  CREATE TABLE IF NOT EXISTS public.schema_migrations (
    name text PRIMARY KEY,
    applied_at timestamptz NOT NULL DEFAULT now()
  )
`;

const files = (await readdir(migrationsDir)).filter((file) => file.endsWith('.sql')).sort();
const appliedRows = await sql`SELECT name FROM public.schema_migrations`;
const applied = new Set(appliedRows.map((row) => row.name));

for (const file of files) {
  if (applied.has(file)) {
    console.log(`- ${file} (já aplicada)`);
    continue;
  }

  const content = await readFile(path.join(migrationsDir, file), 'utf8');
  const statements = splitSqlStatements(content);
  const recordMigration = (tx) =>
    tx`INSERT INTO public.schema_migrations (name) VALUES (${file})`;

  console.log(`+ ${file} (${statements.length} comandos)`);

  if (shouldRunOutsideTransaction(content)) {
    // CREATE INDEX CONCURRENTLY e VACUUM não podem rodar dentro de transação.
    for (const statement of statements) {
      await sql.query(statement);
    }
    await recordMigration(sql);
  } else {
    // Comandos + registro commitam juntos: ou a migration inteira entra, ou nada entra.
    await sql.transaction((tx) => [
      ...statements.map((statement) => tx.query(statement)),
      recordMigration(tx),
    ]);
  }
}

console.log('Migrations concluídas.');
