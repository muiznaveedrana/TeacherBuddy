const API = 'http://localhost:3000';

const missing = [
  'time-sports-day',
  'time-sports-day-251218-200107',
  'time-weekend-fun',
  'time-weekend-fun-251218-200054',
  'time-school-day-251218-200041',
  'movement-which-way-basic-practice',
  'movement-which-way-basic-practice-251218-220008',
  'movement-which-way-basic-practice-251218-213659'
];

async function main() {
  const response = await fetch(`${API}/api/library/browse?year_group=Year%202&limit=200`);
  const data = await response.json();

  for (const slug of missing) {
    const ws = data.worksheets.find(w => w.slug === slug);
    if (!ws) {
      console.log(`${slug}: NOT FOUND`);
      continue;
    }

    const html = ws.html_content || '';
    const keyMatch = html.match(/<div[^>]*class="[^"]*answer-key[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    if (!keyMatch) {
      console.log(`${slug}: NO ANSWER KEY`);
      continue;
    }

    const rawAnswers = [...keyMatch[1].matchAll(/<p><strong>\d+\.<\/strong>\s*(.+?)<\/p>/gi)]
      .map(m => m[1].replace(/<[^>]+>/g, '').trim());

    console.log(`${slug}: ${JSON.stringify(rawAnswers)}`);
  }
}

main().catch(console.error);
