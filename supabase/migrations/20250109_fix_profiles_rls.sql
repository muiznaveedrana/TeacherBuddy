-- ============================================================================
-- FIX INFINITE RECURSION IN PROFILES RLS POLICIES
-- ============================================================================

-- Drop the problematic admin policy that causes infinite recursion
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Create a secure function to check admin role without recursion
-- This uses SECURITY DEFINER to bypass RLS and access profiles directly
CREATE OR REPLACE FUNCTION public.check_is_admin()
RETURNS BOOLEAN AS $$
DECLARE
  user_role TEXT;
BEGIN
  -- Directly query without triggering RLS (SECURITY DEFINER)
  SELECT role INTO user_role
  FROM public.profiles
  WHERE id = auth.uid()
  LIMIT 1;

  RETURN COALESCE(user_role = 'admin', FALSE);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

-- Recreate admin policy using the secure function
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (public.check_is_admin());

-- Also update the worksheet policies to use the new function
DROP POLICY IF EXISTS "Admins can update any worksheet" ON library_worksheets;
DROP POLICY IF EXISTS "Admins can delete any worksheet" ON library_worksheets;

CREATE POLICY "Admins can update any worksheet"
  ON library_worksheets FOR UPDATE
  USING (public.check_is_admin());

CREATE POLICY "Admins can delete any worksheet"
  ON library_worksheets FOR DELETE
  USING (public.check_is_admin());
