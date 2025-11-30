const { saveFromFile } = require('./claude-save-to-library.js')

const worksheets = [
  {
    file: 'public/preview-worksheet-1.html',
    metadata: {
      year_group: 'Reception',
      topic: 'number-counting',
      subtopic: 'number-bonds',
      difficulty: 'average',
      question_count: 5,
      visual_theme: 'animals'
    }
  },
  {
    file: 'public/preview-worksheet-2.html',
    metadata: {
      year_group: 'Reception',
      topic: 'number-counting',
      subtopic: 'number-bonds',
      difficulty: 'average',
      question_count: 5,
      visual_theme: 'nature'
    }
  },
  {
    file: 'public/preview-worksheet-3.html',
    metadata: {
      year_group: 'Reception',
      topic: 'number-counting',
      subtopic: 'number-bonds',
      difficulty: 'average',
      question_count: 5,
      visual_theme: 'everyday'
    }
  }
]

async function saveAll() {
  for (const ws of worksheets) {
    console.log(`\n📄 Saving ${ws.file}...`)
    try {
      await saveFromFile(ws.file, ws.metadata)
    } catch (err) {
      console.error(`❌ Failed: ${err.message}`)
    }
  }
  console.log('\n✅ All done!')
}

saveAll()
