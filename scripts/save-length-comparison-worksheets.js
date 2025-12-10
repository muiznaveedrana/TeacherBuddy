const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';

const worksheets = [
  {
    file: 'preview-length-comparison-v1.html',
    metadata: {
      title: 'Length Comparison - School Supplies v2',
      slug: 'length-comparison-school-supplies-v2',
      year_group: 'Reception',
      topic: 'measurement',
      subtopic: 'length-comparison',
      question_count: 5,
      difficulty: 'easy',
      visual_theme: 'school-supplies',
      activity_type: 'comparison',
      layout_type: 'static',
      quality_score: 95
    }
  },
  {
    file: 'preview-length-comparison-v2.html',
    metadata: {
      title: 'Length Comparison - Garden Fun v2',
      slug: 'length-comparison-garden-fun-v2',
      year_group: 'Reception',
      topic: 'measurement',
      subtopic: 'length-comparison',
      question_count: 5,
      difficulty: 'average',
      visual_theme: 'garden-fun',
      activity_type: 'comparison',
      layout_type: 'static',
      quality_score: 95
    }
  },
  {
    file: 'preview-length-comparison-v3.html',
    metadata: {
      title: 'Length Comparison - Animals & Transport v2',
      slug: 'length-comparison-animals-transport-v2',
      year_group: 'Reception',
      topic: 'measurement',
      subtopic: 'length-comparison',
      question_count: 5,
      difficulty: 'hard',
      visual_theme: 'animals-transport',
      activity_type: 'comparison',
      layout_type: 'static',
      quality_score: 95
    }
  }
];

async function saveWorksheet(worksheetData) {
  const htmlPath = path.join(__dirname, '..', 'public', worksheetData.file);
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

  const payload = {
    worksheetHtml: htmlContent,
    metadata: worksheetData.metadata
  };

  console.log(`\nSaving: ${worksheetData.metadata.title}`);
  console.log(`Slug: ${worksheetData.metadata.slug}`);

  try {
    const response = await fetch(`${BASE_URL}/api/library/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log(`✅ Success! ID: ${result.id}`);
    return result;
  } catch (error) {
    console.error(`❌ Failed: ${error.message}`);
    throw error;
  }
}

async function main() {
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║  SAVING LENGTH COMPARISON WORKSHEETS TO LIBRARY      ║');
  console.log('╚══════════════════════════════════════════════════════╝');

  const results = [];

  for (const worksheet of worksheets) {
    const result = await saveWorksheet(worksheet);
    results.push(result);
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  ALL WORKSHEETS SAVED SUCCESSFULLY                   ║');
  console.log('╚══════════════════════════════════════════════════════╝\n');

  results.forEach((result, idx) => {
    console.log(`${idx + 1}. ${worksheets[idx].metadata.slug}`);
    console.log(`   ID: ${result.id}`);
    console.log(`   URL: ${BASE_URL}/library/${worksheets[idx].metadata.slug}`);
  });
}

main().catch(console.error);
