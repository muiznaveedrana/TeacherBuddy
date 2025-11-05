-- ============================================================================
-- WORKSHEET LIBRARY DATABASE SCHEMA
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLE: library_worksheets
-- ============================================================================

CREATE TABLE IF NOT EXISTS library_worksheets (
  -- Primary
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,

  -- Content
  title VARCHAR(255) NOT NULL,
  html_content TEXT NOT NULL,

  -- Region (Future-proof for US/AU expansion - MVP is UK only)
  region VARCHAR(10) DEFAULT 'UK' CHECK (region IN ('UK', 'US', 'AU', 'CA')),

  -- Curriculum
  year_group VARCHAR(50) NOT NULL,
  topic VARCHAR(255) NOT NULL,
  subtopic VARCHAR(255) NOT NULL,
  difficulty VARCHAR(20) DEFAULT 'average' CHECK (difficulty IN ('easy', 'average', 'hard')), -- Hidden from UI
  question_count INTEGER DEFAULT 5 CHECK (question_count BETWEEN 1 AND 50), -- Hidden from UI
  layout_type VARCHAR(50) NOT NULL,

  -- Differentiation Fields (For unique identification)
  visual_theme VARCHAR(50), -- 'animals', 'fruits', 'toys', 'vehicles', etc.
  activity_type VARCHAR(100), -- 'circle-answer', 'fill-blanks', 'matching', 'color-count', etc.
  seasonal_theme VARCHAR(50), -- 'christmas', 'halloween', 'summer', 'spring', etc.
  worksheet_version VARCHAR(20), -- 'A', 'B', '1', '2', etc.

  -- Visuals
  thumbnail_url VARCHAR(500) NOT NULL,
  preview_images JSONB DEFAULT '[]'::jsonb,

  -- SEO
  seo_title VARCHAR(60),
  seo_description VARCHAR(160),
  seo_keywords TEXT[],

  -- Quality
  quality_score DECIMAL(5,2) CHECK (quality_score BETWEEN 0 AND 100),
  tags TEXT[] DEFAULT '{}',

  -- Publishing
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  published_by UUID REFERENCES auth.users(id),

  -- Analytics (Simple, no user accounts needed)
  view_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  last_downloaded_at TIMESTAMP WITH TIME ZONE,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- TABLE: library_downloads (For Analytics Only)
-- ============================================================================

CREATE TABLE IF NOT EXISTS library_downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  worksheet_id UUID NOT NULL REFERENCES library_worksheets(id) ON DELETE CASCADE,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  ip_hash VARCHAR(64),
  referrer TEXT,
  country_code VARCHAR(2),
  user_id UUID REFERENCES auth.users(id)
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_library_worksheets_slug ON library_worksheets(slug) WHERE status = 'published';
CREATE INDEX idx_library_worksheets_region_status ON library_worksheets(region, status, published_at DESC) WHERE status = 'published';
CREATE INDEX idx_library_worksheets_year_group ON library_worksheets(region, year_group) WHERE status = 'published';
CREATE INDEX idx_library_worksheets_topic ON library_worksheets(region, topic) WHERE status = 'published';
CREATE INDEX idx_library_worksheets_visual_theme ON library_worksheets(region, visual_theme) WHERE status = 'published';
CREATE INDEX idx_library_worksheets_activity_type ON library_worksheets(region, activity_type) WHERE status = 'published';
CREATE INDEX idx_library_worksheets_seasonal ON library_worksheets(region, seasonal_theme) WHERE status = 'published' AND seasonal_theme IS NOT NULL;
CREATE INDEX idx_library_worksheets_popular ON library_worksheets(region, view_count DESC, download_count DESC) WHERE status = 'published';
CREATE INDEX idx_library_downloads_worksheet ON library_downloads(worksheet_id, downloaded_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE library_worksheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_downloads ENABLE ROW LEVEL SECURITY;

-- Policies: library_worksheets (Admin-only writes, Public reads)
CREATE POLICY "Public can view published worksheets"
  ON library_worksheets FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can create worksheets"
  ON library_worksheets FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update own worksheets"
  ON library_worksheets FOR UPDATE
  USING (published_by = auth.uid());

CREATE POLICY "Users can delete own worksheets"
  ON library_worksheets FOR DELETE
  USING (published_by = auth.uid());

-- Policies: library_downloads (Anonymous tracking)
CREATE POLICY "Anyone can record downloads"
  ON library_downloads FOR INSERT
  WITH CHECK (true);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_library_worksheets_updated_at
  BEFORE UPDATE ON library_worksheets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Increment view count (for analytics)
CREATE OR REPLACE FUNCTION increment_view_count(worksheet_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE library_worksheets
  SET view_count = view_count + 1
  WHERE id = worksheet_id AND status = 'published';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Increment download count (for analytics)
CREATE OR REPLACE FUNCTION increment_download_count(worksheet_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE library_worksheets
  SET
    download_count = download_count + 1,
    last_downloaded_at = NOW()
  WHERE id = worksheet_id AND status = 'published';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
