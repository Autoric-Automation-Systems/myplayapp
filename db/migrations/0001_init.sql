-- Schema base do MyPlayApp: usuários -> repertórios -> blocos -> músicas.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  password text,
  picture text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Necessário para o upsert por e-mail feito no login.
CREATE UNIQUE INDEX IF NOT EXISTS users_email_key ON public.users (email);

CREATE TABLE IF NOT EXISTS public.lists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users (id) ON DELETE CASCADE,
  title text NOT NULL,
  is_public boolean NOT NULL DEFAULT false,
  is_favorite boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS lists_user_created_idx
  ON public.lists (user_id, created_at);

CREATE TABLE IF NOT EXISTS public.blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  list_id uuid NOT NULL REFERENCES public.lists (id) ON DELETE CASCADE,
  title text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS blocks_list_position_idx
  ON public.blocks (list_id, position, created_at);

CREATE TABLE IF NOT EXISTS public.tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  block_id uuid NOT NULL REFERENCES public.blocks (id) ON DELETE CASCADE,
  title text NOT NULL,
  key text NOT NULL DEFAULT '',
  bpm integer NOT NULL DEFAULT 100,
  style text NOT NULL DEFAULT '',
  artist text NOT NULL DEFAULT '',
  lyrics text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS tracks_block_created_idx
  ON public.tracks (block_id, created_at);

-- Garante colunas em bases criadas antes desta migração.
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS picture text;
ALTER TABLE public.lists ADD COLUMN IF NOT EXISTS is_public boolean NOT NULL DEFAULT false;
ALTER TABLE public.lists ADD COLUMN IF NOT EXISTS is_favorite boolean NOT NULL DEFAULT false;
ALTER TABLE public.blocks ADD COLUMN IF NOT EXISTS position integer NOT NULL DEFAULT 0;

-- Distribui a posição dos blocos antigos que ficaram todos em zero.
WITH ordered AS (
  SELECT
    id,
    row_number() OVER (PARTITION BY list_id ORDER BY created_at) - 1 AS pos
  FROM public.blocks
  WHERE position = 0
)
UPDATE public.blocks b
SET position = o.pos
FROM ordered o
WHERE b.id = o.id AND o.pos <> 0;
