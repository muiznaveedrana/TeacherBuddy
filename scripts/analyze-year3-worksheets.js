const API = 'http://localhost:3000';

async function main() {
  const response = await fetch(`${API}/api/library/browse?year_group=Year%203&limit=300`);
  const data = await response.json();

  const results = [];
  for (const ws of data.worksheets) {
    const html = ws.html_content || '';
    const keyMatch = html.match(/<div[^>]*class="[^"]*answer-key[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    if (!keyMatch) {
      results.push({ slug: ws.slug, answers: null, error: 'NO_ANSWER_KEY' });
      continue;
    }

    const rawAnswers = [...keyMatch[1].matchAll(/<p><strong>\d+\.<\/strong>\s*(.+?)<\/p>/gi)]
      .map(m => m[1].replace(/<[^>]+>/g, '').trim());

    results.push({ slug: ws.slug, answers: rawAnswers });
  }

  // Group by topic prefix for analysis
  const topics = {};
  for (const r of results) {
    const prefix = r.slug.split('-').slice(0, 3).join('-');
    if (!topics[prefix]) topics[prefix] = [];
    topics[prefix].push(r);
  }

  console.log('Year 3 Worksheets by Topic:');
  for (const [topic, items] of Object.entries(topics).sort()) {
    const withAnswers = items.filter(i => i.answers && i.answers.length > 0).length;
    console.log(`  ${topic}: ${items.length} worksheets, ${withAnswers} with answers`);
  }

  console.log(`\nTotal: ${results.length} worksheets`);
  console.log(`With answers: ${results.filter(r => r.answers && r.answers.length > 0).length}`);
  console.log(`Without answers: ${results.filter(r => !r.answers || r.answers.length === 0).length}`);

  // Show first 10 with answers
  console.log('\nFirst 10 worksheets with answers:');
  const withAnswers = results.filter(r => r.answers && r.answers.length > 0);
  for (const ws of withAnswers.slice(0, 10)) {
    console.log(`  ${ws.slug}: ${JSON.stringify(ws.answers)}`);
  }
}

main().catch(console.error);
