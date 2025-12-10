const fs = require('fs');
const path = require('path');

const WORKSHEETS = [
  {
    file: 'public/preview-worksheet-weight-comparison-1.html',
    metadata: {
      title: 'Weight Comparison - Everyday Objects',
      slug: 'measurement-weight-comparison-v1',
      year_group: 'Reception',
      topic: 'measurement',
      subtopic: 'weight-comparison',
      question_count: 5,
      difficulty: 'easy',
      visual_theme: 'Everyday Objects',
      activity_type: 'comparison',
      layout_type: 'static',
      quality_score: 95
    }
  },
  {
    file: 'public/preview-worksheet-weight-comparison-2.html',
    metadata: {
      title: 'Weight Comparison - Farm Animals',
      slug: 'measurement-weight-comparison-v2',
      year_group: 'Reception',
      topic: 'measurement',
      subtopic: 'weight-comparison',
      question_count: 5,
      difficulty: 'average',
      visual_theme: 'Farm Animals',
      activity_type: 'comparison',
      layout_type: 'static',
      quality_score: 95
    }
  },
  {
    file: 'public/preview-worksheet-weight-comparison-3.html',
    metadata: {
      title: 'Weight Comparison - Food & Nature',
      slug: 'measurement-weight-comparison-v3',
      year_group: 'Reception',
      topic: 'measurement',
      subtopic: 'weight-comparison',
      question_count: 5,
      difficulty: 'hard',
      visual_theme: 'Food & Nature',
      activity_type: 'comparison',
      layout_type: 'static',
      quality_score: 95
    }
  }
];

async function saveWorksheet(worksheet) {
  const htmlPath = path.join(__dirname, '..', worksheet.file);
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  const payload = {
    worksheetHtml: htmlContent,
    metadata: worksheet.metadata
  };

  console.log(`\nSaving: ${worksheet.metadata.slug}`);
  console.log(`Theme: ${worksheet.metadata.visual_theme}`);
  console.log(`Difficulty: ${worksheet.metadata.difficulty}`);

  const response = await fetch('http://localhost:3000/api/library/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });

  const result = await response.json();

  if (response.ok) {
    console.log(`✅ Saved successfully!`);
    console.log(`   Slug: ${result.worksheet.slug}`);
    console.log(`   URL: /library/${result.worksheet.slug}`);
    return result.worksheet.slug;
  } else {
    console.error(`❌ Failed to save:`, result.error || result);
    throw new Error(`Failed to save ${worksheet.metadata.slug}`);
  }
}

async function main() {
  console.log('════════════════════════════════════════════════════════');
  console.log('  WEIGHT COMPARISON WORKSHEETS - LIBRARY SAVE SCRIPT');
  console.log('════════════════════════════════════════════════════════');

  const savedSlugs = [];

  for (const worksheet of WORKSHEETS) {
    try {
      const slug = await saveWorksheet(worksheet);
      savedSlugs.push(slug);
      await new Promise(resolve => setTimeout(resolve, 500)); // Small delay between saves
    } catch (error) {
      console.error(`\n❌ Error saving ${worksheet.metadata.slug}:`, error.message);
      process.exit(1);
    }
  }

  console.log('\n════════════════════════════════════════════════════════');
  console.log('✅ ALL WORKSHEETS SAVED SUCCESSFULLY!');
  console.log('════════════════════════════════════════════════════════');
  console.log('\nSaved slugs:');
  savedSlugs.forEach(slug => console.log(`  - ${slug}`));
  console.log('\n');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
