import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL não configurada. Veja o .env.example.');
}

export const sql = neon(connectionString);
