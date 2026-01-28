/**
 * Fix Year 5 Duplicate Worksheets - Manual Content
 *
 * Duplicates to fix with predefined unique answers:
 * - y5-fractions-f2 (was duplicate of f1: 1¼, 2⅓, 4½, 2¾, 3)
 * - y5-fractions-p4 (was duplicate of p1: 2⅚, 4⅖, 3⅛, 3¹/₁₀, 23)
 * - y5-thousandths-p2 (was duplicate of f2: 2, 3, 4, 5, 3.456...)
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// New unique answers for each worksheet
const NEW_ANSWERS = {
  'y5-fractions-f2': {
    // Foundation 2 - different from f1 (1¼, 2⅓, 4½, 2¾, 3)
    // Using: 1½, 1⅔, 2¼, 3⅓, 4
    answers: ['1½', '1⅔', '2¼', '3⅓', '4'],
    description: 'Foundation level - simpler mixed numbers'
  },
  'y5-fractions-p4': {
    // Practice 4 - different from p1 (2⅚, 4⅖, 3⅛, 3¹/₁₀, 23)
    // Using: 3⅔, 5⅜, 4⅕, 2⁷/₁₀, 31
    answers: ['3⅔', '5⅜', '4⅕', '2⁷/₁₀', '31'],
    description: 'Practice level - varied denominators'
  },
  'y5-thousandths-p2': {
    // Practice 2 Baking - different from f2 (2, 3, 4, 5, 3.456, 1.234, 12.345, Hundredths, 4, 5, 1.234, 1.243, 1.324, No, 0.003)
    // Using completely different digit values and decimals
    answers: ['8', '1', '6', '9', '7.892', '4.567', '15.238', 'Thousandths', '6', '8', '2.468', '2.486', '2.648', 'Yes', '0.008'],
    description: 'Thousandths with baking theme - different values'
  }
};

async function backupWorksheet(slug) {
  const { data, error } = await supabase
    .from('library_worksheets')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw new Error(`Failed to fetch ${slug}: ${error.message}`);
  return data;
}

function updateHtmlAnswers(html, newAnswers) {
  let updatedHtml = html;
  let answerIndex = 0;

  // Replace data-answer attributes one by one
  updatedHtml = html.replace(/data-answer="([^"]+)"/g, (match, oldAnswer) => {
    if (answerIndex < newAnswers.length) {
      const newAnswer = newAnswers[answerIndex];
      answerIndex++;
      console.log(`  Replacing: "${oldAnswer}" → "${newAnswer}"`);
      return `data-answer="${newAnswer}"`;
    }
    return match;
  });

  console.log(`  Replaced ${answerIndex} answers`);
  return updatedHtml;
}

async function updateWorksheet(slug, newHtml) {
  const { error } = await supabase
    .from('library_worksheets')
    .update({
      html_content: newHtml,
      updated_at: new Date().toISOString()
    })
    .eq('slug', slug);

  if (error) throw new Error(`Failed to update ${slug}: ${error.message}`);
}

async function main() {
  console.log('='.repeat(60));
  console.log('Year 5 Duplicate Fix - Manual Content');
  console.log('='.repeat(60));

  const backups = {};
  const slugs = Object.keys(NEW_ANSWERS);

  // Step 1: Backup
  console.log('\n📦 Step 1: Backing up worksheets...');
  for (const slug of slugs) {
    backups[slug] = await backupWorksheet(slug);
    console.log(`✅ Backed up: ${slug}`);
  }

  // Save backup
  const backupFile = `scripts/y5-batch2-manual-backup-${Date.now()}.json`;
  fs.writeFileSync(backupFile, JSON.stringify(backups, null, 2));
  console.log(`💾 Backup saved to: ${backupFile}`);

  // Step 2: Update each worksheet
  console.log('\n🔧 Step 2: Updating worksheets...');
  for (const slug of slugs) {
    console.log(`\n--- ${slug} ---`);
    console.log(`Description: ${NEW_ANSWERS[slug].description}`);

    const worksheet = backups[slug];
    const newHtml = updateHtmlAnswers(worksheet.html_content, NEW_ANSWERS[slug].answers);

    await updateWorksheet(slug, newHtml);
    console.log(`✅ Updated: ${slug}`);
  }

  // Step 3: Verify
  console.log('\n✅ Step 3: Verifying all Year 5 worksheets...');

  // Check fractions
  console.log('\n--- Improper Fractions ---');
  const { data: fractions } = await supabase
    .from('library_worksheets')
    .select('slug, html_content')
    .like('slug', 'y5-fractions%')
    .order('slug');

  for (const w of fractions) {
    const answers = [...w.html_content.matchAll(/data-answer="([^"]+)"/g)]
      .slice(0, 5)
      .map(m => m[1]);
    console.log(`${w.slug}: ${answers.join(', ')}`);
  }

  // Check thousandths
  console.log('\n--- Thousandths ---');
  const { data: thousandths } = await supabase
    .from('library_worksheets')
    .select('slug, html_content')
    .like('slug', 'y5-thousandths%')
    .order('slug');

  for (const w of thousandths) {
    const answers = [...w.html_content.matchAll(/data-answer="([^"]+)"/g)]
      .slice(0, 5)
      .map(m => m[1]);
    console.log(`${w.slug}: ${answers.join(', ')}`);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✨ Done! Now run E2E tests to verify.');
  console.log('='.repeat(60));
}

main().catch(console.error);
