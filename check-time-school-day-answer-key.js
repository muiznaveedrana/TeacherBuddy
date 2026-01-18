const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkAnswerKey() {
  const { data, error } = await supabase
    .from('worksheets')
    .select('slug, html_content')
    .eq('slug', 'time-school-day')
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  // Extract the Answer Key section
  const answerKeyMatch = data.html_content.match(/<h3[^>]*>Answer Key<\/h3>([\s\S]*?)(?=<h[23]|$)/i);

  if (answerKeyMatch) {
    console.log('\n=== ANSWER KEY SECTION ===\n');
    console.log(answerKeyMatch[1].substring(0, 1500));

    // Extract individual answers
    const answerRegex = /<p><strong>(\d+)\.<\/strong>\s*(.+?)<\/p>/g;
    let match;
    console.log('\n=== PARSED ANSWERS ===\n');
    while ((match = answerRegex.exec(answerKeyMatch[1])) !== null) {
      console.log(`Q${match[1]}: ${match[2].trim()}`);
    }
  } else {
    console.log('Answer Key section not found');

    // Try alternative pattern
    console.log('\nSearching for any answer patterns...');
    const altMatch = data.html_content.match(/<strong>5\.<\/strong>\s*([^<]+)/);
    if (altMatch) {
      console.log('Q5 answer:', altMatch[1]);
    }
  }
}

checkAnswerKey();
