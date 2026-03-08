
CREATE POLICY "Authenticated users can view contact submissions"
  ON public.contact_submissions FOR SELECT
  TO authenticated
  USING (true);
