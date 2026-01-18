const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function getWorksheetAnswers() {
  const { data, error } = await supabase
    .from('worksheets')
    .select('slug, html_content')
    .eq('slug', 'time-school-day')
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  if (!data) {
    console.log('No worksheet found with slug: time-school-day');
    return;
  }

  console.log('Worksheet slug:', data.slug);
  console.log('\nExtracting answers from HTML...\n');

  // Extract answers from the answer key section
  const answerKeyRegex = /<p><strong>(\d+)\.<\/strong>\s*(.+?)<\/p>/g;
  const answers = [];
  let match;

  while ((match = answerKeyRegex.exec(data.html_content)) !== null) {
    answers.push({
      questionNum: match[1],
      answer: match[2].trim()
    });
  }

  console.log('Found answers:');
  answers.forEach((ans, idx) => {
    console.log(`Q${ans.questionNum}: ${ans.answer}`);
  });

  // Also extract the actual questions to understand context
  console.log('\n\nSearching for question patterns...\n');

  // Look for time-specific patterns
  const timePatterns = [
    /(\d+):(\d+)\s*(am|pm|a\.m\.|p\.m\.)?/gi,
    /(\d+)\s+hours?/gi,
    /(\d+)\s+minutes?/gi,
    /quarter past|half past|quarter to/gi
  ];

  const htmlPreview = data.html_content.substring(0, 5000);
  console.log('HTML Preview (first 5000 chars for inspection):');
  console.log(htmlPreview);
}

getWorksheetAnswers();
