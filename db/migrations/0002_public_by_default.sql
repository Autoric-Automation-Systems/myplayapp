-- Repertório passa a ser público por padrão; o dono pode torná-lo privado ao editar.

ALTER TABLE public.lists ALTER COLUMN is_public SET DEFAULT true;
