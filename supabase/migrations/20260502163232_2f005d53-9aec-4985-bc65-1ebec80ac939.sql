-- 1. Create role enum
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 2. user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. has_role security definer function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 4. RLS on user_roles: users see own; admins see all; only admins manage
DROP POLICY IF EXISTS "users_view_own_roles" ON public.user_roles;
CREATE POLICY "users_view_own_roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admins_manage_roles" ON public.user_roles;
CREATE POLICY "admins_manage_roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 5. Seed admin role for the existing admin email if user exists
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role FROM auth.users WHERE email = 'mk.momworld@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- 6. Update handle_new_user to grant admin role to that email automatically on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', split_part(NEW.email, '@', 1)));

  IF NEW.email = 'mk.momworld@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

-- 7. Replace email-based admin policies with role-based ones

-- campaigns
DROP POLICY IF EXISTS admin_view_all_campaigns ON public.campaigns;
DROP POLICY IF EXISTS admin_insert_campaigns ON public.campaigns;
DROP POLICY IF EXISTS admin_update_campaigns ON public.campaigns;
DROP POLICY IF EXISTS admin_delete_campaigns ON public.campaigns;

CREATE POLICY admin_view_all_campaigns ON public.campaigns
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY admin_insert_campaigns ON public.campaigns
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY admin_update_campaigns ON public.campaigns
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY admin_delete_campaigns ON public.campaigns
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- contact_submissions
DROP POLICY IF EXISTS admin_view_submissions ON public.contact_submissions;
CREATE POLICY admin_view_submissions ON public.contact_submissions
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- profiles
DROP POLICY IF EXISTS admin_view_all_profiles ON public.profiles;
CREATE POLICY admin_view_all_profiles ON public.profiles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
