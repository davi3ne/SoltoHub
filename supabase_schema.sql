-- supabase_schema.sql
-- Execute este script no SQL Editor do seu projeto Supabase para configurar as tabelas necessárias.

-- 1. Tabela de Projetos (Hubs)
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT DEFAULT 'fa-solid fa-cube',
    color TEXT DEFAULT '#dc2626',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS para Projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 2. Tabela de Perfis de Usuário
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    role TEXT DEFAULT 'user' NOT NULL, -- 'admin' ou 'user'
    projects JSONB DEFAULT '[]'::jsonb NOT NULL, -- Lista de ids de projetos permitidos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS para user_profiles
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- 3. Tabela de Estados dos Projetos (Dados do Hub)
CREATE TABLE IF NOT EXISTS public.app_state (
    id TEXT PRIMARY KEY REFERENCES public.projects(id) ON DELETE CASCADE,
    data JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS para app_state
ALTER TABLE public.app_state ENABLE ROW LEVEL SECURITY;

-- ====================================================
-- REGRAS DE SEGURANÇA (RLS - Row Level Security)
-- ====================================================

-- Trigger para criar perfil automaticamente no Signup do Auth se criado diretamente (opcional)
-- Para que o admin consiga criar usuários no client-side:
-- Permitir signup público no Supabase Auth.
-- Políticas de acesso na tabela user_profiles:
-- Qualquer usuário autenticado pode ler seu próprio perfil.
CREATE POLICY "Users can read own profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = id);

-- Admins podem fazer tudo na tabela user_profiles
CREATE POLICY "Admins have full access on profiles" ON public.user_profiles
    USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid() AND user_profiles.role = 'admin'
        )
    );

-- Políticas de acesso na tabela projects:
-- Usuários podem ler projetos se forem admins ou se o ID do projeto estiver na lista de projetos dele
CREATE POLICY "Users can read assigned projects" ON public.projects
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid() AND (
                user_profiles.role = 'admin' OR 
                user_profiles.projects ? projects.id
            )
        )
    );

-- Admins podem fazer tudo na tabela projects
CREATE POLICY "Admins have full access on projects" ON public.projects
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid() AND user_profiles.role = 'admin'
        )
    );

-- Políticas de acesso na tabela app_state:
-- Usuários podem ler/gravar o estado do projeto se tiverem acesso ao projeto
CREATE POLICY "Users can read state of assigned projects" ON public.app_state
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid() AND (
                user_profiles.role = 'admin' OR 
                user_profiles.projects ? app_state.id
            )
        )
    );

CREATE POLICY "Users can update state of assigned projects" ON public.app_state
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid() AND (
                user_profiles.role = 'admin' OR 
                user_profiles.projects ? app_state.id
            )
        )
    );

-- ====================================================
-- POPULAR DADOS INICIAIS (Apenas exemplo)
-- ====================================================
-- Nota: O primeiro admin precisa ser inserido manualmente no auth.users do Supabase,
-- ou seu perfil inserido em user_profiles com a role 'admin' após o cadastro inicial.
