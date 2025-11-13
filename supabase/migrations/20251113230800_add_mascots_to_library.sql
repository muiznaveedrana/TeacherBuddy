-- Add mascots column to library_worksheets table for storing mascot positioning data

ALTER TABLE library_worksheets
ADD COLUMN IF NOT EXISTS mascots JSONB DEFAULT '[]'::jsonb;

COMMENT ON COLUMN library_worksheets.mascots IS 'Array of mascot objects with positioning and styling info (id, src, x, y, width, height, rotation, opacity, zIndex, locked)';
