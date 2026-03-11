
-- Drop ALL existing policies on campaigns
DROP POLICY IF EXISTS "Admin can delete campaigns" ON public.campaigns;
DROP POLICY IF EXISTS "Admin can insert campaigns" ON public.campaigns;
DROP POLICY IF EXISTS "Admin can update campaigns" ON public.campaigns;
DROP POLICY IF EXISTS "Admin can view all campaigns" ON public.campaigns;
DROP POLICY IF EXISTS "Anyone can view active campaigns" ON public.campaigns;

-- Recreate as PERMISSIVE (default)
CREATE POLICY "anyone_view_active_campaigns" ON public.campaigns FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "admin_view_all_campaigns" ON public.campaigns FOR SELECT TO authenticated USING ((auth.jwt() ->> 'email') = 'mk.momworld@gmail.com');
CREATE POLICY "admin_insert_campaigns" ON public.campaigns FOR INSERT TO authenticated WITH CHECK ((auth.jwt() ->> 'email') = 'mk.momworld@gmail.com');
CREATE POLICY "admin_update_campaigns" ON public.campaigns FOR UPDATE TO authenticated USING ((auth.jwt() ->> 'email') = 'mk.momworld@gmail.com');
CREATE POLICY "admin_delete_campaigns" ON public.campaigns FOR DELETE TO authenticated USING ((auth.jwt() ->> 'email') = 'mk.momworld@gmail.com');

-- Drop ALL existing policies on contact_submissions
DROP POLICY IF EXISTS "Admin can view contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Anyone can insert contact submissions" ON public.contact_submissions;

CREATE POLICY "anyone_insert_submissions" ON public.contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admin_view_submissions" ON public.contact_submissions FOR SELECT TO authenticated USING ((auth.jwt() ->> 'email') = 'mk.momworld@gmail.com');

-- Drop ALL existing policies on profiles
DROP POLICY IF EXISTS "Admin can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

CREATE POLICY "users_view_own_profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "users_insert_own_profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "users_update_own_profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "users_delete_own_profile" ON public.profiles FOR DELETE TO authenticated USING (auth.uid() = id);
CREATE POLICY "admin_view_all_profiles" ON public.profiles FOR SELECT TO authenticated USING ((auth.jwt() ->> 'email') = 'mk.momworld@gmail.com');
