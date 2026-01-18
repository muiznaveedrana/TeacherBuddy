-- Fix Time worksheet answer keys for Q5
-- All 6 worksheets have "00" instead of the correct calculated time

-- School Day variants: PE starts at 1:30 + 30min = 2:00
UPDATE worksheets
SET html_content = REPLACE(html_content, '<p><strong>5.</strong> 00, No</p>', '<p><strong>5.</strong> 2:00, No</p>')
WHERE slug IN ('time-school-day', 'time-school-day-251218-200041')
AND html_content LIKE '%<p><strong>5.</strong> 00, No</p>%';

-- Sports Day variants: Correct time is 1:15
UPDATE worksheets
SET html_content = REPLACE(html_content, '<p><strong>5.</strong> 00, No</p>', '<p><strong>5.</strong> 1:15, No</p>')
WHERE slug IN ('time-sports-day', 'time-sports-day-251218-200107')
AND html_content LIKE '%<p><strong>5.</strong> 00, No</p>%';

-- Weekend Fun variants: Correct time is 3:15
UPDATE worksheets
SET html_content = REPLACE(html_content, '<p><strong>5.</strong> 00, No</p>', '<p><strong>5.</strong> 3:15, No</p>')
WHERE slug IN ('time-weekend-fun', 'time-weekend-fun-251218-200054')
AND html_content LIKE '%<p><strong>5.</strong> 00, No</p>%';

-- Verify the updates
SELECT slug,
       SUBSTRING(html_content FROM '<p><strong>5\.</strong>[^<]+</p>') as q5_answer
FROM worksheets
WHERE slug LIKE 'time-%'
ORDER BY slug;
