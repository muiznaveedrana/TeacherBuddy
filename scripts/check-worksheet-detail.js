const API = 'http://localhost:3000';

async function main() {
  const slug = process.argv[2] || 'addition-subtraction-add-subtract-word-problems';
  const yearGroup = process.argv[3] || 'Year 3';

  console.log(`Looking for ${slug} in ${yearGroup}...`);

  const response = await fetch(`${API}/api/library/browse?year_group=${encodeURIComponent(yearGroup)}&limit=300`);
  const data = await response.json();

  const ws = data.worksheets.find(w => w.slug === slug);
  if (!ws) {
    console.log('NOT FOUND:', slug);
    process.exit(1);
  }

  const html = ws.html_content || '';
  const keyMatch = html.match(/<div[^>]*class="[^"]*answer-key[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  console.log('Raw answer key section:');
  console.log(keyMatch ? keyMatch[1] : 'NO KEY');

  // Extract individual answers
  if (keyMatch) {
    const rawAnswers = [...keyMatch[1].matchAll(/<p><strong>(\d+)\.<\/strong>\s*(.+?)<\/p>/gi)]
      .map(m => ({ q: m[1], a: m[2].replace(/<[^>]+>/g, '').trim() }));
    console.log('\nExtracted answers:');
    for (const {q, a} of rawAnswers) {
      console.log(`  Q${q}: ${a}`);
    }
  }

  // Count inputs in HTML
  const inputCount = (html.match(/<input[^>]*type="text"[^>]*>/gi) || []).length;
  console.log('\nInput count in HTML:', inputCount);
}

main().catch(console.error);
