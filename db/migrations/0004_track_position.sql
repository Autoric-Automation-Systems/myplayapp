-- Ordem explícita das músicas dentro do bloco (antes só existia created_at).

ALTER TABLE public.tracks ADD COLUMN IF NOT EXISTS position integer NOT NULL DEFAULT 0;

WITH ordered AS (
  SELECT
    id,
    row_number() OVER (PARTITION BY block_id ORDER BY created_at, id) - 1 AS pos
  FROM public.tracks
)
UPDATE public.tracks t
SET position = o.pos
FROM ordered o
WHERE t.id = o.id AND t.position <> o.pos;

CREATE INDEX IF NOT EXISTS tracks_block_position_idx
  ON public.tracks (block_id, position, created_at);
