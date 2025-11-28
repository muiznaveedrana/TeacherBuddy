-- Migration: Add alt_text column for SEO-optimized image descriptions
-- Purpose: Store US-first alt text for worksheet thumbnails (accessibility + SEO)

-- Add alt_text column to library_worksheets table
ALTER TABLE library_worksheets
ADD COLUMN IF NOT EXISTS alt_text TEXT;

-- Add comment for documentation
COMMENT ON COLUMN library_worksheets.alt_text IS
'SEO-optimized alt text for worksheet thumbnail image. Auto-generated on save using US-first terminology.';

-- Backfill existing worksheets with generated alt text
UPDATE library_worksheets
SET alt_text = CONCAT(
  'Free ',
  CASE year_group
    WHEN 'Reception' THEN 'Kindergarten'
    WHEN 'Year 1' THEN 'Grade 1'
    WHEN 'Year 2' THEN 'Grade 2'
    WHEN 'Year 3' THEN 'Grade 3'
    WHEN 'Year 4' THEN 'Grade 4'
    WHEN 'Year 5' THEN 'Grade 5'
    WHEN 'Year 6' THEN 'Grade 6'
    ELSE year_group
  END,
  ' ',
  REPLACE(subtopic, '-', ' '),
  ' math worksheet',
  CASE
    WHEN visual_theme IS NOT NULL AND visual_theme != ''
    THEN CONCAT(' - ', LOWER(visual_theme), ' themed')
    ELSE ''
  END
)
WHERE alt_text IS NULL;
