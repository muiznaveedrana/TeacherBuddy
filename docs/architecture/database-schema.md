# Database Schema

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (managed by Supabase Auth)
-- This table is automatically created by Supabase Auth
-- We reference auth.users for foreign keys

-- User profiles table
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    country VARCHAR(100) NOT NULL DEFAULT 'England',
    curriculum VARCHAR(100) NOT NULL DEFAULT 'UK National Curriculum',
    year_group VARCHAR(50) NOT NULL,
    last_topic VARCHAR(255),
    last_subtopic VARCHAR(255),
    last_difficulty VARCHAR(20) CHECK (last_difficulty IN ('Easy', 'Average', 'Hard')),
    last_question_count INTEGER CHECK (last_question_count BETWEEN 5 AND 30),
    last_name_list_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Name lists table
CREATE TABLE name_lists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    names TEXT[] NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    tier VARCHAR(20) NOT NULL DEFAULT 'Free' CHECK (tier IN ('Free', 'Pro', 'Pro Plus')),
    stripe_customer_id VARCHAR(255),
    stripe_subscription_id VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Canceled', 'Past Due', 'Incomplete')),
    current_period_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    current_period_end TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '1 month'),
    monthly_limit INTEGER NOT NULL DEFAULT 30,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id),
    UNIQUE(stripe_customer_id),
    UNIQUE(stripe_subscription_id)
);

-- Usage counters table
CREATE TABLE usage_counters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    month_year VARCHAR(7) NOT NULL, -- Format: YYYY-MM
    monthly_count INTEGER NOT NULL DEFAULT 0,
    daily_count INTEGER NOT NULL DEFAULT 0,
    last_generation_date DATE DEFAULT CURRENT_DATE,
    last_reset_date DATE DEFAULT CURRENT_DATE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, month_year)
);

-- Worksheet generations table
CREATE TABLE worksheet_generations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    topic VARCHAR(255) NOT NULL,
    subtopic VARCHAR(255) NOT NULL,
    difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('Easy', 'Average', 'Hard')),
    question_count INTEGER NOT NULL CHECK (question_count BETWEEN 5 AND 30),
    name_list_id UUID REFERENCES name_lists(id) ON DELETE SET NULL,
    pdf_url TEXT,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processing_time_ms INTEGER,
    FOREIGN KEY (name_list_id) REFERENCES name_lists(id)
);

-- Row Level Security (RLS) Policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE name_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_counters ENABLE ROW LEVEL SECURITY;
ALTER TABLE worksheet_generations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Database functions for atomic operations
CREATE OR REPLACE FUNCTION increment_usage_counter(p_user_id UUID)
RETURNS TABLE(monthly_count INTEGER, daily_count INTEGER, monthly_limit INTEGER) AS $$
-- [Function implementation truncated for brevity]
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Default name list data
INSERT INTO name_lists (user_id, name, names, is_default) VALUES
('00000000-0000-0000-0000-000000000000', 'UK Primary Names', 
ARRAY['Emma', 'Oliver', 'Ava', 'George', 'Isla', 'Noah', 'Sophia', 'Leo', 'Lily', 'Arthur', 
      'Grace', 'Oscar', 'Freya', 'Archie', 'Charlotte', 'Jack', 'Amelia', 'Harry', 'Emily', 'Henry'], 
true);
```

*[This file contains the truncated database schema. Full schema includes all indexes, triggers, functions, and RLS policies as defined in the original architecture document.]*