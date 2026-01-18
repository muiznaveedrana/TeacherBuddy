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

async function fixWorksheets() {
  for (const slug of WORKSHEETS) {
    console.log(`\n=== Checking ${slug} ===`);

    const { data, error } = await supabase
      .from('worksheets')
      .select('slug, html_content')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error(`❌ Error fetching ${slug}:`, error.message);
      continue;
    }

    if (!data) {
      console.log(`⚠️ Worksheet ${slug} not found`);
      continue;
    }

    // Extract Q5 answer from Answer Key section
    const answerKeyMatch = data.html_content.match(/<h3[^>]*>Answer Key<\/h3>([\s\S]*?)(?=<h[23]|$)/i);

    if (!answerKeyMatch) {
      console.log('⚠️ No Answer Key section found');
      continue;
    }

    const q5Match = answerKeyMatch[1].match(/<p><strong>5\.<\/strong>\s*([^<]+)<\/p>/);

    if (!q5Match) {
      console.log('⚠️ Q5 answer not found');
      continue;
    }

    const currentAnswer = q5Match[1].trim();
    console.log(`Current Q5 answer: "${currentAnswer}"`);

    // Check if it's wrong (has "00" instead of time)
    if (currentAnswer.startsWith('00,') || currentAnswer === '00, No') {
      console.log('❌ Found incorrect answer! Needs fixing...');

      // Extract the correct time from the question
      const q5Html = data.html_content.match(/<div class="question q-reasoning">[\s\S]*?<span class="question-number">5<\/span>[\s\S]*?<\/div>\s*<\/div>/);

      if (q5Html) {
        // Look for the PE/activity start time and duration
        const startTimeMatch = q5Html[0].match(/starts at <strong>([\d:]+)<\/strong>/);
        const durationMatch = q5Html[0].match(/lasts <strong>(\d+) minutes<\/strong>/);

        if (startTimeMatch && durationMatch) {
          const startTime = startTimeMatch[1];
          const duration = parseInt(durationMatch[1]);

          console.log(`  Activity starts: ${startTime}, duration: ${duration} minutes`);

          // Calculate the correct end time
          const [hour, minute] = startTime.split(':').map(Number);
          const totalMinutes = hour * 60 + minute + duration;
          const endHour = Math.floor(totalMinutes / 60);
          const endMinute = totalMinutes % 60;
          const endTime = `${endHour}:${endMinute.toString().padStart(2, '0')}`;

          console.log(`  Calculated end time: ${endTime}`);

          const correctAnswer = `${endTime}, No`;
          console.log(`  Correct answer should be: "${correctAnswer}"`);

          // Update the HTML
          const updatedHTML = data.html_content.replace(
            new RegExp(`(<p><strong>5\\.<\\/strong>\\s*)${currentAnswer.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(<\\/p>)`),
            `$1${correctAnswer}$2`
          );

          if (updatedHTML === data.html_content) {
            console.log('⚠️ Failed to replace - pattern not matched');
            continue;
          }

          // Update in database
          const { error: updateError } = await supabase
            .from('worksheets')
            .update({ html_content: updatedHTML })
            .eq('slug', slug);

          if (updateError) {
            console.error(`❌ Error updating ${slug}:`, updateError.message);
            continue;
          }

          console.log(`✅ Updated ${slug} successfully!`);
        } else {
          console.log('⚠️ Could not extract start time and duration');
        }
      } else {
        console.log('⚠️ Could not find Q5 HTML');
      }
    } else {
      console.log('✅ Answer looks correct');
    }
  }

  console.log('\n=== Done ===');
}

fixWorksheets();
