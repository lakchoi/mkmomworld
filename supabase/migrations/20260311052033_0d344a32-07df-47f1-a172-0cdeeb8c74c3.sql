
-- Drop ALL existing policies on campaigns
DROP POLICY IF EXISTS "anyone_view_active_campaigns" ON public.campaigns;
DROP POLICY IF EXISTS "admin_view_all_campaigns" ON public.campaigns;
DROP POLICY IF EXISTS "admin_insert_campaigns" ON public.campaigns;
DROP POLICY IF EXISTS "admin_update_campaigns" ON public.campaigns;
DROP POLICY IF EXISTS "admin_delete_campaigns" ON public.campaigns;

-- Recreate as explicitly PERMISSIVE
CREATE POLICY "anyone_view_active_campaigns" ON public.campaigns AS PERMISSIVE FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "admin_view_all_campaigns" ON public.campaigns AS PERMISSIVE FOR SELECT TO authenticated USING ((auth.jwt() ->> 'email') = 'mk.momworld@gmail.com');
CREATE POLICY "admin_insert_campaigns" ON public.campaigns AS PERMISSIVE FOR INSERT TO authenticated WITH CHECK ((auth.jwt() ->> 'email') = 'mk.momworld@gmail.com');
CREATE POLICY "admin_update_campaigns" ON public.campaigns AS PERMISSIVE FOR UPDATE TO authenticated USING ((auth.jwt() ->> 'email') = 'mk.momworld@gmail.com');
CREATE POLICY "admin_delete_campaigns" ON public.campaigns AS PERMISSIVE FOR DELETE TO authenticated USING ((auth.jwt() ->> 'email') = 'mk.momworld@gmail.com');

-- Drop ALL existing policies on contact_submissions
DROP POLICY IF EXISTS "anyone_insert_submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "admin_view_submissions" ON public.contact_submissions;

CREATE POLICY "anyone_insert_submissions" ON public.contact_submissions AS PERMISSIVE FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admin_view_submissions" ON public.contact_submissions AS PERMISSIVE FOR SELECT TO authenticated USING ((auth.jwt() ->> 'email') = 'mk.momworld@gmail.com');

-- Drop ALL existing policies on profiles
DROP POLICY IF EXISTS "users_view_own_profile" ON public.profiles;
DROP POLICY IF EXISTS "users_insert_own_profile" ON public.profiles;
DROP POLICY IF EXISTS "users_update_own_profile" ON public.profiles;
DROP POLICY IF EXISTS "users_delete_own_profile" ON public.profiles;
DROP POLICY IF EXISTS "admin_view_all_profiles" ON public.profiles;

CREATE POLICY "users_view_own_profile" ON public.profiles AS PERMISSIVE FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "users_insert_own_profile" ON public.profiles AS PERMISSIVE FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "users_update_own_profile" ON public.profiles AS PERMISSIVE FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "users_delete_own_profile" ON public.profiles AS PERMISSIVE FOR DELETE TO authenticated USING (auth.uid() = id);
CREATE POLICY "admin_view_all_profiles" ON public.profiles AS PERMISSIVE FOR SELECT TO authenticated USING ((auth.jwt() ->> 'email') = 'mk.momworld@gmail.com');
