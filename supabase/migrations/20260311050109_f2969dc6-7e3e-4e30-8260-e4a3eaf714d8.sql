
-- Drop all existing RESTRICTIVE policies on campaigns
DROP POLICY IF EXISTS "Admin can delete campaigns" ON public.campaigns;
DROP POLICY IF EXISTS "Admin can insert campaigns" ON public.campaigns;
DROP POLICY IF EXISTS "Admin can update campaigns" ON public.campaigns;
DROP POLICY IF EXISTS "Admin can view all campaigns" ON public.campaigns;
DROP POLICY IF EXISTS "Anyone can view active campaigns" ON public.campaigns;

-- Recreate as PERMISSIVE policies
CREATE POLICY "Anyone can view active campaigns" ON public.campaigns FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Admin can view all campaigns" ON public.campaigns FOR SELECT TO authenticated USING ((auth.jwt() ->> 'email') = 'mk.momworld@gmail.com');
CREATE POLICY "Admin can insert campaigns" ON public.campaigns FOR INSERT TO authenticated WITH CHECK ((auth.jwt() ->> 'email') = 'mk.momworld@gmail.com');
CREATE POLICY "Admin can update campaigns" ON public.campaigns FOR UPDATE TO authenticated USING ((auth.jwt() ->> 'email') = 'mk.momworld@gmail.com');
CREATE POLICY "Admin can delete campaigns" ON public.campaigns FOR DELETE TO authenticated USING ((auth.jwt() ->> 'email') = 'mk.momworld@gmail.com');

-- Fix contact_submissions policies too
DROP POLICY IF EXISTS "Admin can view contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Anyone can insert contact submissions" ON public.contact_submissions;

CREATE POLICY "Anyone can insert contact submissions" ON public.contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admin can view contact submissions" ON public.contact_submissions FOR SELECT TO authenticated USING ((auth.jwt() ->> 'email') = 'mk.momworld@gmail.com');

-- Fix profiles policies
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can delete own profile" ON public.profiles FOR DELETE TO authenticated USING (auth.uid() = id);

-- Admin can view all profiles
CREATE POLICY "Admin can view all profiles" ON public.profiles FOR SELECT TO authenticated USING ((auth.jwt() ->> 'email') = 'mk.momworld@gmail.com');
