
DROP POLICY IF EXISTS "Authenticated users can view contact submissions" ON public.contact_submissions;

CREATE POLICY "Admin can view contact submissions"
  ON public.contact_submissions FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'mk.momworld@gmail.com');
