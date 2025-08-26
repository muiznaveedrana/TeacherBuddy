-- Initial database schema for WorksheetGenerator.AI
-- This migration creates the core tables for user management and authentication

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  name text,
  country text DEFAULT 'England',
  curriculum text DEFAULT 'UK National Curriculum',
  year_group text,
  school text,
  teaching_subjects text[] DEFAULT '{}',
  subscription_tier text DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'premium')),
  last_configuration jsonb,
  default_name_list text,
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);

-- Usage tracking table
CREATE TABLE IF NOT EXISTS public.usage_tracking (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  worksheets_generated_daily integer DEFAULT 0,
  worksheets_generated_monthly integer DEFAULT 0,
  worksheets_generated_total integer DEFAULT 0,
  last_generation_at timestamptz,
  daily_reset_date date DEFAULT CURRENT_DATE,
  monthly_reset_date date DEFAULT DATE_TRUNC('month', CURRENT_DATE)::date,
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW(),
  
  UNIQUE(user_id)
);

-- Worksheet generations table (for history and tracking)
CREATE TABLE IF NOT EXISTS public.worksheet_generations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  subject text NOT NULL,
  level text NOT NULL,
  year_group text NOT NULL,
  topic text NOT NULL,
  question_count integer NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  config jsonb NOT NULL,
  pdf_url text,
  created_at timestamptz DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(id);
CREATE INDEX IF NOT EXISTS idx_usage_tracking_user_id ON public.usage_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_worksheet_generations_user_id ON public.worksheet_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_worksheet_generations_created_at ON public.worksheet_generations(created_at);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worksheet_generations ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Usage tracking policies
CREATE POLICY "Users can view own usage" ON public.usage_tracking
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own usage" ON public.usage_tracking
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own usage" ON public.usage_tracking
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Worksheet generations policies
CREATE POLICY "Users can view own worksheets" ON public.worksheet_generations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own worksheets" ON public.worksheet_generations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Functions for automatic profile creation and usage tracking

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'name', new.email));
  
  INSERT INTO public.usage_tracking (user_id)
  VALUES (new.id);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at timestamps
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_usage_tracking_updated_at BEFORE UPDATE ON public.usage_tracking
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Function to reset daily usage counters
CREATE OR REPLACE FUNCTION public.reset_daily_usage()
RETURNS void AS $$
BEGIN
  UPDATE public.usage_tracking
  SET worksheets_generated_daily = 0,
      daily_reset_date = CURRENT_DATE
  WHERE daily_reset_date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to reset monthly usage counters
CREATE OR REPLACE FUNCTION public.reset_monthly_usage()
RETURNS void AS $$
BEGIN
  UPDATE public.usage_tracking
  SET worksheets_generated_monthly = 0,
      monthly_reset_date = DATE_TRUNC('month', CURRENT_DATE)::date
  WHERE monthly_reset_date < DATE_TRUNC('month', CURRENT_DATE)::date;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment usage counters
CREATE OR REPLACE FUNCTION public.increment_usage_counter(p_user_id uuid)
RETURNS void AS $$
BEGIN
  -- Reset counters if needed
  PERFORM public.reset_daily_usage();
  PERFORM public.reset_monthly_usage();
  
  -- Increment counters
  UPDATE public.usage_tracking
  SET worksheets_generated_daily = worksheets_generated_daily + 1,
      worksheets_generated_monthly = worksheets_generated_monthly + 1,
      worksheets_generated_total = worksheets_generated_total + 1,
      last_generation_at = NOW()
  WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;