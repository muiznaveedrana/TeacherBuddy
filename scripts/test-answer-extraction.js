const fs = require('fs');
const path = require('path');

// Read the worksheet HTML
const worksheetPath = path.join(__dirname, '../public/preview-worksheet-time-days-months-3.html');
const html = fs.readFileSync(worksheetPath, 'utf8');

// Extract answer key manually using regex
const answerKeyRegex = /<div class="answer-key">[\s\S]*?<\/div>/i;
const answerKeyMatch = html.match(answerKeyRegex);

if (answerKeyMatch) {
  console.log('Answer Key HTML:');
  console.log(answerKeyMatch[0]);
  console.log('\n---\n');

  // Extract individual answers
  const paragraphs = answerKeyMatch[0].match(/<p><strong>(\d+)\.<\/strong>\s*(.+?)<\/p>/g);

  if (paragraphs) {
    console.log('Extracted Answers:');
    paragraphs.forEach(p => {
      const match = p.match(/<p><strong>(\d+)\.<\/strong>\s*(.+?)<\/p>/);
      if (match) {
        const [, num, fullText] = match;
        console.log(`Q${num}: "${fullText}"`);

        // Try to extract just the answer value
        const spanMatch = fullText.match(/<span[^>]*>([^<]+)<\/span>/);
        if (spanMatch) {
          console.log(`  -> Clean answer: "${spanMatch[1]}"`);
        }
      }
    });
  }
} else {
  console.log('No answer key found!');
}
