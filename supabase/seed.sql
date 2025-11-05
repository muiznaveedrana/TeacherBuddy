-- ============================================================================
-- SAMPLE DATA FOR WORKSHEET LIBRARY
-- ============================================================================

-- Sample Worksheet 1: Counting to 10 with Animals
INSERT INTO library_worksheets (
  slug,
  title,
  html_content,
  region,
  year_group,
  topic,
  subtopic,
  difficulty,
  question_count,
  layout_type,
  visual_theme,
  activity_type,
  thumbnail_url,
  seo_title,
  seo_description,
  quality_score,
  status,
  published_at
) VALUES (
  'counting-to-10-with-cute-animals',
  'Count to 10 with Cute Animals - Reception Math Worksheet',
  '<div class="worksheet"><h1>Count the Animals</h1><p>Sample HTML content...</p></div>',
  'UK',
  'Reception',
  'Number & Counting',
  'Counting to 10',
  'average',
  5,
  'default',
  'animals',
  'circle-answer',
  'https://placehold.co/600x800/png?text=Counting+Animals',
  'Count to 10 with Animals - Reception Worksheet',
  'Fun counting worksheet for Reception students featuring cute animals. Perfect for practicing numbers 1-10.',
  95.5,
  'published',
  NOW()
);

-- Sample Worksheet 2: Addition with Fruits
INSERT INTO library_worksheets (
  slug,
  title,
  html_content,
  region,
  year_group,
  topic,
  subtopic,
  layout_type,
  visual_theme,
  activity_type,
  thumbnail_url,
  status,
  published_at
) VALUES (
  'simple-addition-with-colorful-fruits',
  'Simple Addition with Colorful Fruits - Year 1 Math',
  '<div class="worksheet"><h1>Add the Fruits</h1><p>Sample content...</p></div>',
  'UK',
  'Year 1',
  'Addition',
  'Adding within 10',
  'default',
  'fruits',
  'picture-addition',
  'https://placehold.co/600x800/png?text=Addition+Fruits',
  'published',
  NOW()
);

-- Sample Worksheet 3: Shapes Recognition
INSERT INTO library_worksheets (
  slug,
  title,
  html_content,
  region,
  year_group,
  topic,
  subtopic,
  layout_type,
  visual_theme,
  thumbnail_url,
  status,
  published_at
) VALUES (
  'basic-shapes-recognition-colorful',
  'Basic Shapes Recognition - Reception Worksheet',
  '<div class="worksheet"><h1>Find the Shapes</h1><p>Sample content...</p></div>',
  'UK',
  'Reception',
  'Shapes',
  'Basic Shapes',
  'grid-layout',
  'colorful-shapes',
  'https://placehold.co/600x800/png?text=Shapes',
  'published',
  NOW()
);

-- Sample Worksheet 4: Subtraction with Toys
INSERT INTO library_worksheets (
  slug,
  title,
  html_content,
  region,
  year_group,
  topic,
  subtopic,
  layout_type,
  visual_theme,
  seasonal_theme,
  thumbnail_url,
  status,
  published_at
) VALUES (
  'subtraction-within-10-toys-christmas',
  'Subtraction within 10 - Christmas Toys Edition',
  '<div class="worksheet"><h1>Take Away the Toys</h1><p>Sample content...</p></div>',
  'UK',
  'Year 1',
  'Subtraction',
  'Subtracting within 10',
  '2-column-layout',
  'toys',
  'christmas',
  'https://placehold.co/600x800/png?text=Subtraction+Christmas',
  'published',
  NOW()
);

-- Sample Worksheet 5: Number Recognition
INSERT INTO library_worksheets (
  slug,
  title,
  html_content,
  region,
  year_group,
  topic,
  subtopic,
  layout_type,
  activity_type,
  thumbnail_url,
  status,
  published_at
) VALUES (
  'number-recognition-1-to-20-tracing',
  'Number Recognition 1-20 with Tracing',
  '<div class="worksheet"><h1>Trace the Numbers</h1><p>Sample content...</p></div>',
  'UK',
  'Reception',
  'Number & Counting',
  'Number Recognition',
  'default',
  'tracing',
  'https://placehold.co/600x800/png?text=Number+Tracing',
  'published',
  NOW()
);
