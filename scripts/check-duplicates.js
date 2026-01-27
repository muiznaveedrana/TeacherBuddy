require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Mapping of duplicate worksheets to their originals
const DUPLICATE_MAPPING = {
  'y5-mult-4x2-f2': 'y5-mult-4x2-f1',
  'y5-short-div-f2': 'y5-short-div-f1',
  'y5-short-div-p2': 'y5-short-div-p1',
  'y5-short-div-p4': 'y5-short-div-p1',
  'y5-thousandths-p1': 'y5-thousandths-f2',
  'y5-thousandths-p3': 'y5-thousandths-p2',
  'y5-thousandths-p4': 'y5-thousandths-f2',
  'y5-add-fractions-p4': 'y5-add-fractions-p2'
};

const getAnswers = (html) => {
  const matches = html.match(/data-answer="([^"]+)"/g) || [];
  return matches.map(m => m.match(/data-answer="([^"]+)"/)[1]);
};

(async () => {
  console.log('Checking for duplicate worksheets...\n');

  for (const [duplicate, original] of Object.entries(DUPLICATE_MAPPING)) {
    const { data: dupData } = await supabase.from('library_worksheets').select('html_content').eq('slug', duplicate).single();
    const { data: origData } = await supabase.from('library_worksheets').select('html_content').eq('slug', original).single();

    const dupAnswers = getAnswers(dupData.html_content);
    const origAnswers = getAnswers(origData.html_content);

    const isDuplicate = JSON.stringify(dupAnswers) === JSON.stringify(origAnswers);

    if (isDuplicate) {
      console.log('❌ DUPLICATE:', duplicate, 'vs', original);
      console.log('   Answers:', JSON.stringify(dupAnswers.slice(0, 5)), '...');
    } else {
      console.log('✅ UNIQUE:', duplicate, 'vs', original);
    }
  }
})();
