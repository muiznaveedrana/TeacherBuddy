/**
 * Simple wrapper for claude-save-to-library.js
 * Avoids JSON escaping issues in PowerShell/CMD
 * 
 * Usage: node scripts/save-worksheet.js <file> <year_group> <topic> <subtopic> [difficulty] [question_count]
 */

const { saveFromFile } = require('./claude-save-to-library.js')

const args = process.argv.slice(2)

if (args.length < 4) {
  console.log(`
Usage: node scripts/save-worksheet.js <file> <year_group> <topic> <subtopic> [difficulty] [question_count]

Example:
  node scripts/save-worksheet.js public/preview-worksheet-1.html Reception number-counting counting-to-10 average 5
  `)
  process.exit(1)
}

const [file, year_group, topic, subtopic, difficulty = 'average', question_count = '5'] = args

const metadata = {
  year_group,
  topic,
  subtopic,
  difficulty,
  question_count: parseInt(question_count),
}

console.log('📋 Metadata:', metadata)

saveFromFile(file, metadata)
  .then(() => {
    console.log('✅ Done!')
    process.exit(0)
  })
  .catch((err) => {
    console.error('❌ Error:', err)
    process.exit(1)
  })
