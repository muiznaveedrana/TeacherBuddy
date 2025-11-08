-- ============================================================================
-- ADD RICH CONTENT FIELDS FOR SEO & EDUCATIONAL VALUE
-- ============================================================================

-- Add educational content fields
ALTER TABLE library_worksheets
ADD COLUMN IF NOT EXISTS learning_objectives TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS how_to_use TEXT,
ADD COLUMN IF NOT EXISTS educational_benefits TEXT,
ADD COLUMN IF NOT EXISTS skills_developed TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS estimated_time_minutes INTEGER DEFAULT 20 CHECK (estimated_time_minutes BETWEEN 5 AND 120),
ADD COLUMN IF NOT EXISTS curriculum_standards TEXT[] DEFAULT '{}';

-- Add FAQ for SEO (JSONB format: [{"question": "...", "answer": "..."}])
ALTER TABLE library_worksheets
ADD COLUMN IF NOT EXISTS faq JSONB DEFAULT '[]'::jsonb;

-- Comments for documentation
COMMENT ON COLUMN library_worksheets.learning_objectives IS 'List of specific learning objectives covered in this worksheet';
COMMENT ON COLUMN library_worksheets.how_to_use IS 'Teacher guidance on how to use this worksheet effectively';
COMMENT ON COLUMN library_worksheets.educational_benefits IS 'Rich description of educational value and benefits (200-300 words for SEO)';
COMMENT ON COLUMN library_worksheets.skills_developed IS 'List of skills this worksheet helps develop';
COMMENT ON COLUMN library_worksheets.estimated_time_minutes IS 'Estimated time to complete the worksheet in minutes';
COMMENT ON COLUMN library_worksheets.curriculum_standards IS 'Relevant curriculum standards/objectives (e.g., UK National Curriculum codes)';
COMMENT ON COLUMN library_worksheets.faq IS 'Frequently asked questions in JSON format for FAQ schema markup';
