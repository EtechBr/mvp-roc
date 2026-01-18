-- Migration: Adicionar coluna password_hash à tabela profiles
-- Esta coluna armazena o hash bcrypt da senha do usuário

-- Adicionar coluna password_hash
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS password_hash text;

-- Comentário na coluna
COMMENT ON COLUMN public.profiles.password_hash IS 'Hash bcrypt da senha do usuário';

-- Criar índice para busca por email (se não existir)
CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles (email);

-- Criar índice para busca por cpf (se não existir)
CREATE INDEX IF NOT EXISTS profiles_cpf_idx ON public.profiles (cpf);
