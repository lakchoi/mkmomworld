
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS consent_privacy boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS consent_notification boolean DEFAULT false;
