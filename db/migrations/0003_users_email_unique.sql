-- Consolida contas duplicadas por e-mail e garante unicidade.
-- O login é exclusivamente via Google: a coluna `password` nunca foi usada e sai do schema.

WITH keepers AS (
  SELECT DISTINCT ON (lower(email)) id, lower(email) AS email_key
  FROM public.users
  ORDER BY lower(email), created_at ASC, id ASC
)
UPDATE public.lists l
SET user_id = k.id
FROM public.users u
JOIN keepers k ON k.email_key = lower(u.email)
WHERE l.user_id = u.id AND l.user_id <> k.id;

WITH keepers AS (
  SELECT DISTINCT ON (lower(email)) id, lower(email) AS email_key
  FROM public.users
  ORDER BY lower(email), created_at ASC, id ASC
)
DELETE FROM public.users u
USING keepers k
WHERE lower(u.email) = k.email_key AND u.id <> k.id;

CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_key ON public.users (lower(email));

ALTER TABLE public.users DROP COLUMN IF EXISTS password;
