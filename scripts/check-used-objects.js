const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  const { data, error } = await supabase
    .from('library_worksheets')
    .select('title, subtopic, html_content')
    .eq('status', 'published');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Found ${data.length} worksheets:\n`);
  
  data.forEach(w => {
    const imgs = [...w.html_content.matchAll(/\/images\/([^."]+)\.png/g)].map(m => m[1]);
    const unique = [...new Set(imgs)];
    console.log(`${w.subtopic} - "${w.title}":`);
    console.log(`  Objects: ${unique.join(', ')}\n`);
  });
}

main();
