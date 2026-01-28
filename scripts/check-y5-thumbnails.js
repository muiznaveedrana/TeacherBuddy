const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkThumbnails() {
  const { data, error } = await supabase
    .from('library_worksheets')
    .select('slug, title, thumbnail_url, updated_at')
    .eq('year_group', 'Year 5')
    .order('slug');
  
  if (error) {
    console.error('Error:', error);
    return;
  }

  // Find duplicate thumbnail URLs
  const urlCounts = {};
  data.forEach(w => {
    if (w.thumbnail_url) {
      // Extract the base filename from URL
      const match = w.thumbnail_url.match(/thumbnails\/([^?]+)/);
      const key = match ? match[1] : w.thumbnail_url;
      if (!urlCounts[key]) urlCounts[key] = [];
      urlCounts[key].push(w.slug);
    }
  });

  console.log('\n=== Year 5 Worksheets Thumbnail Analysis ===\n');
  
  // Show worksheets with same thumbnail
  console.log('DUPLICATE THUMBNAILS (same image used for multiple worksheets):');
  let dupeCount = 0;
  Object.entries(urlCounts).forEach(([url, slugs]) => {
    if (slugs.length > 1) {
      dupeCount++;
      console.log(`\n[DUPLICATE ${dupeCount}] ${url}`);
      slugs.forEach(s => console.log(`  - ${s}`));
    }
  });
  
  if (dupeCount === 0) {
    console.log('  None found');
  }

  // Show worksheets missing thumbnails
  console.log('\n\nMISSING THUMBNAILS:');
  const missing = data.filter(w => !w.thumbnail_url);
  if (missing.length > 0) {
    missing.forEach(w => console.log(`  - ${w.slug}: ${w.title}`));
  } else {
    console.log('  None');
  }

  // Check de-duplicated worksheets
  const dedupSlugs = [
    'y5-add-fractions-p1', 'y5-add-fractions-p2', 'y5-add-fractions-p3',
    'y5-mult-4x2-p1', 'y5-mult-4x2-p2', 'y5-mult-4x2-p3', 'y5-mult-4x2-p4',
    'y5-short-div-p3'
  ];
  
  console.log('\n\nDE-DUPLICATED WORKSHEETS - NEED THUMBNAIL REGENERATION:');
  dedupSlugs.forEach(slug => {
    const w = data.find(d => d.slug === slug);
    if (w) {
      const thumbFile = w.thumbnail_url?.match(/thumbnails\/([^?]+)/)?.[1] || 'N/A';
      console.log(`  ${slug}: ${thumbFile}`);
    }
  });
  
  console.log('\n\nTOTAL: ' + data.length + ' worksheets');
}

checkThumbnails();
