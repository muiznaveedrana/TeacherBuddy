const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getCapacityWorksheets() {
  const { data, error } = await supabase
    .from('library_worksheets')
    .select('slug, title, html_content')
    .eq('subtopic', 'capacity')
    .eq('status', 'published');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Found ${data.length} capacity worksheets:\n`);

  for (const ws of data) {
    console.log(`=== ${ws.slug} ===`);
    console.log(`Title: ${ws.title}`);

    // Extract answer key
    const answerKeyMatch = ws.html_content.match(/<div class="answer-key[^>]*>([\s\S]*?)<\/div>/i);
    if (answerKeyMatch) {
      console.log('\nAnswer Key (raw):');
      console.log(answerKeyMatch[1]);

      // Extract individual answers
      const answerPattern = /<p><strong>(\d+)\.<\/strong>\s*(.+?)<\/p>/g;
      const answers = [];
      let match;
      while ((match = answerPattern.exec(answerKeyMatch[1])) !== null) {
        answers.push(match[2].trim());
      }

      if (answers.length > 0) {
        console.log('\nParsed Answers:');
        answers.forEach((a, i) => console.log(`  ${i+1}. ${a}`));
        console.log(`\nWORKSHEET_ANSWERS = ${JSON.stringify(answers)}`);
      }
    } else {
      console.log('\n⚠️ No answer key found!');
    }

    console.log('\n' + '-'.repeat(60) + '\n');
  }
}

getCapacityWorksheets();
