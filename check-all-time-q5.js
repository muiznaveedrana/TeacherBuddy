const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const WORKSHEETS = [
  'time-sports-day',
  'time-sports-day-251218-200107',
  'time-weekend-fun',
  'time-weekend-fun-251218-200054',
  'time-school-day',
  'time-school-day-251218-200041'
];

async function checkAll() {
  console.log('Checking all Time worksheets Q5...\n');

  for (const slug of WORKSHEETS) {
    const { data, error } = await supabase
      .from('worksheets')
      .select('slug, html_content')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      console.log(`❌ ${slug}: Not found`);
      continue;
    }

    // Extract Q5 content
    const q5Match = data.html_content.match(/<span class="question-number">5<\/span>[\s\S]*?starts at <strong>([\d:]+)<\/strong>[\s\S]*?lasts <strong>(\d+) minutes<\/strong>/);

    if (q5Match) {
      const startTime = q5Match[1];
      const duration = parseInt(q5Match[2]);

      // Calculate correct end time
      const [hour, minute] = startTime.split(':').map(Number);
      const totalMinutes = hour * 60 + minute + duration;
      const endHour = Math.floor(totalMinutes / 60);
      const endMinute = totalMinutes % 60;
      const correctEndTime = `${endHour}:${endMinute.toString().padStart(2, '0')}`;

      // Get current answer from answer key
      const answerMatch = data.html_content.match(/<h3[^>]*>Answer Key<\/h3>[\s\S]*?<p><strong>5\.<\/strong>\s*([^<]+)<\/p>/);
      const currentAnswer = answerMatch ? answerMatch[1].trim() : 'NOT FOUND';

      console.log(`${slug}:`);
      console.log(`  Q5: Activity starts ${startTime}, lasts ${duration} min`);
      console.log(`  Correct end time: ${correctEndTime}`);
      console.log(`  Current answer key: ${currentAnswer}`);
      console.log(`  Status: ${currentAnswer.startsWith(correctEndTime) ? '✅ CORRECT' : '❌ WRONG'}`);
      console.log('');
    } else {
      console.log(`${slug}: ⚠️ Could not parse Q5\n`);
    }
  }
}

checkAll();
