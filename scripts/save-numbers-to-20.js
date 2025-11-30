const { saveFromFile } = require('./claude-save-to-library.js');

const worksheets = [
  {
    file: 'public/preview-worksheet-1.html',
    metadata: {
      year_group: 'Year 1',
      topic: 'number-place-value',
      subtopic: 'numbers-to-20',
      difficulty: 'average',
      question_count: 5,
      visual_theme: 'fruits'
    }
  },
  {
    file: 'public/preview-worksheet-2.html',
    metadata: {
      year_group: 'Year 1',
      topic: 'number-place-value',
      subtopic: 'numbers-to-20',
      difficulty: 'average',
      question_count: 5,
      visual_theme: 'toys'
    }
  },
  {
    file: 'public/preview-worksheet-3.html',
    metadata: {
      year_group: 'Year 1',
      topic: 'number-place-value',
      subtopic: 'numbers-to-20',
      difficulty: 'average',
      question_count: 5,
      visual_theme: 'shapes'
    }
  }
];

async function saveAll() {
  for (let i = 0; i < worksheets.length; i++) {
    const ws = worksheets[i];
    console.log(`\nSaving worksheet ${i + 1}/${worksheets.length}: ${ws.metadata.visual_theme}...`);
    try {
      await saveFromFile(ws.file, ws.metadata);
      console.log(`✅ Worksheet ${i + 1} saved successfully`);
    } catch (error) {
      console.error(`❌ Error saving worksheet ${i + 1}:`, error.message);
    }
  }
  console.log('\n✅ All done!');
}

saveAll();
