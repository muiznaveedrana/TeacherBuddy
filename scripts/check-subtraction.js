require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkSubtraction() {
  const { data, error } = await supabase
    .from('library_worksheets')
    .select('id, slug, title')
    .eq('subtopic', 'early-subtraction');
  
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Early subtraction worksheets:', data);
  }
}

checkSubtraction();
