
-- Campaigns table
CREATE TABLE public.campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  question text,
  description text,
  image_url text,
  icon text DEFAULT 'Shield',
  items jsonb DEFAULT '[]'::jsonb,
  tags jsonb DEFAULT '[]'::jsonb,
  connections jsonb DEFAULT '[]'::jsonb,
  badge text,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

-- Anyone can view active campaigns
CREATE POLICY "Anyone can view active campaigns"
ON public.campaigns FOR SELECT TO anon, authenticated
USING (is_active = true);

-- Admin can view all campaigns (including inactive)
CREATE POLICY "Admin can view all campaigns"
ON public.campaigns FOR SELECT TO authenticated
USING ((auth.jwt() ->> 'email') = 'mk.momworld@gmail.com');

-- Admin can insert
CREATE POLICY "Admin can insert campaigns"
ON public.campaigns FOR INSERT TO authenticated
WITH CHECK ((auth.jwt() ->> 'email') = 'mk.momworld@gmail.com');

-- Admin can update
CREATE POLICY "Admin can update campaigns"
ON public.campaigns FOR UPDATE TO authenticated
USING ((auth.jwt() ->> 'email') = 'mk.momworld@gmail.com');

-- Admin can delete
CREATE POLICY "Admin can delete campaigns"
ON public.campaigns FOR DELETE TO authenticated
USING ((auth.jwt() ->> 'email') = 'mk.momworld@gmail.com');

-- Profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT TO authenticated
WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
