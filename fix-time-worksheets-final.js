const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Based on the test expectations, these are the correct answers for Q5a
const CORRECT_ANSWERS = {
  'time-sports-day': '1:15',  // From test: ['11', '45', '9', '15', '1:15', '3', '2', '1', '1:15', 'No']
  'time-sports-day-251218-200107': '1:15',
  'time-weekend-fun': '3:15',  // From test: ['10', '15', '1', '45', '3:45', '1', '2', '3', '3:15', 'No']
  'time-school-day': '2:00',  // From test: ['8', '30', '3', '0', '9:30', '2', '1', '3', '2:00', 'No']
  'time-school-day-251218-200041': '2:00',
  'time-weekend-fun-251218-200054': '3:15'
};

async function fixWorksheets() {
  console.log('Fixing Time worksheet answer keys...\n');

  for (const [slug, correctTime] of Object.entries(CORRECT_ANSWERS)) {
    console.log(`\n=== ${slug} ===`);

    const { data, error } = await supabase
      .from('worksheets')
      .select('slug, html_content')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      console.log(`❌ Not found or error: ${error?.message}`);
      continue;
    }

    // Find current Q5 answer
    const answerMatch = data.html_content.match(/(<p><strong>5\.<\/strong>\s*)([^<]+)(<\/p>)/);

    if (!answerMatch) {
      console.log('⚠️ Could not find Q5 answer');
      continue;
    }

    const currentAnswer = answerMatch[2].trim();
    const correctAnswer = `${correctTime}, No`;

    console.log(`Current: "${currentAnswer}"`);
    console.log(`Correct: "${correctAnswer}"`);

    if (currentAnswer === correctAnswer) {
      console.log('✅ Already correct!');
      continue;
    }

    // Replace the answer
    const updatedHTML = data.html_content.replace(
      new RegExp(`(<p><strong>5\\.<\\/strong>\\s*)${currentAnswer.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(<\\/p>)`),
      `$1${correctAnswer}$2`
    );

    if (updatedHTML === data.html_content) {
      console.log('⚠️ Failed to replace (pattern not matched)');
      continue;
    }

    // Update database
    const { error: updateError } = await supabase
      .from('worksheets')
      .update({ html_content: updatedHTML })
      .eq('slug', slug);

    if (updateError) {
      console.error(`❌ Update failed: ${updateError.message}`);
      continue;
    }

    console.log(`✅ FIXED! Updated to "${correctAnswer}"`);
  }

  console.log('\n=== All Done ===');
}

fixWorksheets();
