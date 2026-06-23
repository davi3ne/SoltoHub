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

-- Função de segurança para checar se o usuário é admin (SECURITY DEFINER ignora o RLS para evitar recursão)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Políticas de acesso na tabela user_profiles
CREATE POLICY "Users can read own profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins have full access on profiles" ON public.user_profiles
    FOR ALL USING (public.is_admin());

-- Políticas de acesso na tabela projects
CREATE POLICY "Users can read assigned projects" ON public.projects
    FOR SELECT USING (
        public.is_admin() OR 
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid() AND user_profiles.projects ? projects.id
        )
    );

CREATE POLICY "Admins have full access on projects" ON public.projects
    FOR ALL USING (public.is_admin());

-- Políticas de acesso na tabela app_state
CREATE POLICY "Users can read state of assigned projects" ON public.app_state
    FOR SELECT USING (
        public.is_admin() OR 
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid() AND user_profiles.projects ? app_state.id
        )
    );

CREATE POLICY "Users can update state of assigned projects" ON public.app_state
    FOR ALL USING (
        public.is_admin() OR 
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid() AND user_profiles.projects ? app_state.id
        )
    );

-- ====================================================
-- INICIALIZAÇÃO DE DADOS (Apenas exemplo)
-- ====================================================
-- Nota: O primeiro admin precisa ser inserido manualmente no auth.users do Supabase,
-- ou seu perfil inserido em user_profiles com a role 'admin' após o cadastro inicial.


-- ====================================================
-- AUTO-CONFIRMAÇÃO DE NOVAS CONTAS (Bypass de e-mail)
-- ====================================================
-- Este trigger garante que qualquer nova conta criada no Supabase Auth
-- tenha seu e-mail marcado como confirmado automaticamente, permitindo o login
-- de imediato sem a necessidade de verificação de e-mail.
--
-- NOTA: Você também pode obter o mesmo resultado simplesmente desativando 
-- a opção "Confirm email" em: Authentication -> Providers -> Email no painel do Supabase.

CREATE OR REPLACE FUNCTION public.auto_confirm_user()
RETURNS TRIGGER AS $$
BEGIN
    NEW.email_confirmed_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Remove a trigger anterior se existir para evitar erros
DROP TRIGGER IF EXISTS tr_auto_confirm_user ON auth.users;

CREATE TRIGGER tr_auto_confirm_user
BEFORE INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.auto_confirm_user();


-- ====================================================
-- CRIAÇÃO AUTOMÁTICA DE PERFIL (Profile Auto-Creation)
-- ====================================================
-- Este trigger garante que qualquer novo usuário criado no Supabase Auth (auth.users)
-- tenha automaticamente um perfil correspondente inserido em public.user_profiles.
-- Isso previne que contas fiquem órfãs (sem perfil) se o request do frontend falhar.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, username, display_name, role, projects)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'display_name', SPLIT_PART(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'role', 'user'),
        COALESCE((NEW.raw_user_meta_data->>'projects')::jsonb, '[]'::jsonb)
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Remove a trigger anterior se existir para evitar erros
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();


