const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function check() {
  const { data, error } = await supabase
    .from('library_worksheets')
    .select('year_group, topic, subtopic, slug, title')
    .eq('status', 'published')
    .order('year_group')
    .order('topic')
    .order('subtopic');

  if (error) {
    console.error('Error:', error);
    return;
  }

  // Group by subtopic
  const grouped = {};
  data.forEach(w => {
    const key = w.year_group + ' | ' + w.topic + ' | ' + w.subtopic;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(w.slug);
  });

  console.log('=== LIBRARY WORKSHEETS BY SUBTOPIC ===\n');
  Object.entries(grouped).sort().forEach(([k, slugs]) => {
    console.log(k + ' : ' + slugs.length + ' worksheets');
    slugs.forEach(s => console.log('  - ' + s));
  });

  console.log('\n=== SUMMARY ===');
  const byYear = {};
  data.forEach(w => {
    byYear[w.year_group] = (byYear[w.year_group] || 0) + 1;
  });
  Object.entries(byYear).forEach(([y, c]) => console.log(y + ': ' + c + ' worksheets'));
  console.log('TOTAL: ' + data.length + ' worksheets');

  // Count unique subtopics
  console.log('\n=== SUBTOPIC COUNT ===');
  console.log('Unique subtopics with worksheets: ' + Object.keys(grouped).length);
}

check();
