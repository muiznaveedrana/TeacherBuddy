const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function fixAnswer() {
  // First, fetch the current worksheet
  const { data, error } = await supabase
    .from('worksheets')
    .select('slug, html_content')
    .eq('slug', 'time-school-day')
    .single();

  if (error) {
    console.error('Error fetching:', error);
    return;
  }

  console.log('Current worksheet found:', data.slug);

  // Find the answer for Q5
  const q5Match = data.html_content.match(/<p><strong>5\.<\/strong>\s*([^<]+)<\/p>/);

  if (q5Match) {
    console.log('\nCurrent Q5 answer:', q5Match[1]);
  }

  // Replace the wrong answer "00, No" with the correct answer "2:00, No"
  const updatedHTML = data.html_content.replace(
    /<p><strong>5\.<\/strong>\s*00, No<\/p>/,
    '<p><strong>5.</strong> 2:00, No</p>'
  );

  if (updatedHTML === data.html_content) {
    console.log('\n⚠️ No changes made - pattern not found or already correct');

    // Try to find what the actual Q5 answer is
    const answerKeySection = data.html_content.match(/<h3[^>]*>Answer Key<\/h3>([\s\S]*?)(?=<h[23]|$)/i);
    if (answerKeySection) {
      console.log('\nAnswer Key section found. Searching for Q5...');
      const answers = answerKeySection[1].match(/<p><strong>\d+\.<\/strong>[^<]+<\/p>/g);
      if (answers) {
        console.log('\nAll answers found:');
        answers.forEach(a => console.log(a));
      }
    }
    return;
  }

  console.log('\n✅ Found and replaced answer');

  // Update the database
  const { error: updateError } = await supabase
    .from('worksheets')
    .update({ html_content: updatedHTML })
    .eq('slug', 'time-school-day');

  if (updateError) {
    console.error('Error updating:', updateError);
    return;
  }

  console.log('✅ Database updated successfully!');
  console.log('New Q5 answer: 2:00, No');
}

fixAnswer();
