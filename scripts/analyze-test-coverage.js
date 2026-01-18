/**
 * Test Coverage Analysis Script
 *
 * Compares worksheets in database against test files to identify gaps.
 *
 * Usage: node scripts/analyze-test-coverage.js
 */

const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3000';

async function fetchWorksheets() {
  const response = await fetch(`${API_BASE}/api/library/browse?limit=1000`);
  const data = await response.json();
  return data.worksheets || [];
}

function extractTestedSlugs() {
  const testDirs = [
    path.join(__dirname, '..', 'tests', 'e2e'),
    path.join(__dirname, '..', 'tests', 'e2e', 'interactive')
  ];

  const testedSlugs = new Map(); // slug -> test file

  testDirs.forEach(testDir => {
    if (!fs.existsSync(testDir)) return;

    const files = fs.readdirSync(testDir).filter(f => f.endsWith('.spec.ts'));

    files.forEach(file => {
      const filePath = path.join(testDir, file);
      const content = fs.readFileSync(filePath, 'utf8');

      // Pattern 1: WORKSHEET_SLUG = 'slug'
      const slugMatches = content.matchAll(/WORKSHEET_SLUG\s*=\s*['"]([^'"]+)['"]/g);
      for (const match of slugMatches) {
        testedSlugs.set(match[1], file);
      }

      // Pattern 2: goto('/library/slug/interactive')
      const gotoMatches = content.matchAll(/goto\s*\(\s*[`'"]\/library\/([^\/'"]+)\/interactive/g);
      for (const match of gotoMatches) {
        if (!match[1].includes('$')) { // Skip template literals
          testedSlugs.set(match[1], file);
        }
      }

      // Pattern 3: WORKSHEETS array with slugs
      const arrayMatches = content.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
      for (const match of arrayMatches) {
        testedSlugs.set(match[1], file);
      }
    });
  });

  return testedSlugs;
}

async function main() {
  console.log('='.repeat(70));
  console.log('TEST COVERAGE ANALYSIS');
  console.log('='.repeat(70));

  // Step 1: Fetch worksheets
  console.log('\n[1/3] Fetching worksheets from localhost...');
  const worksheets = await fetchWorksheets();
  console.log(`Found ${worksheets.length} worksheets`);

  // Step 2: Extract tested slugs
  console.log('\n[2/3] Scanning test files...');
  const testedSlugs = extractTestedSlugs();
  console.log(`Found ${testedSlugs.size} tested slugs`);

  // Step 3: Analyze coverage
  console.log('\n[3/3] Analyzing coverage...\n');

  const byYear = {};
  worksheets.forEach(w => {
    const year = w.year_group || 'Unknown';
    if (!byYear[year]) {
      byYear[year] = { total: 0, tested: 0, missing: [] };
    }
    byYear[year].total++;
    if (testedSlugs.has(w.slug)) {
      byYear[year].tested++;
    } else {
      byYear[year].missing.push({
        slug: w.slug,
        title: w.title,
        topic: w.topic,
        subtopic: w.subtopic
      });
    }
  });

  // Print summary
  console.log('='.repeat(70));
  console.log('COVERAGE SUMMARY BY YEAR GROUP');
  console.log('='.repeat(70));
  console.log('');
  console.log('Year Group'.padEnd(15) + 'Total'.padStart(8) + 'Tested'.padStart(8) + 'Missing'.padStart(8) + 'Coverage'.padStart(10));
  console.log('-'.repeat(49));

  let totalWS = 0, totalTested = 0;
  const sortedYears = Object.keys(byYear).sort((a, b) => {
    const order = ['Reception', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'];
    return order.indexOf(a) - order.indexOf(b);
  });

  sortedYears.forEach(year => {
    const data = byYear[year];
    const pct = ((data.tested / data.total) * 100).toFixed(1);
    console.log(
      year.padEnd(15) +
      String(data.total).padStart(8) +
      String(data.tested).padStart(8) +
      String(data.missing.length).padStart(8) +
      (pct + '%').padStart(10)
    );
    totalWS += data.total;
    totalTested += data.tested;
  });

  console.log('-'.repeat(49));
  const totalPct = ((totalTested / totalWS) * 100).toFixed(1);
  console.log(
    'TOTAL'.padEnd(15) +
    String(totalWS).padStart(8) +
    String(totalTested).padStart(8) +
    String(totalWS - totalTested).padStart(8) +
    (totalPct + '%').padStart(10)
  );

  // Print missing worksheets by year
  console.log('\n' + '='.repeat(70));
  console.log('MISSING TESTS BY YEAR GROUP');
  console.log('='.repeat(70));

  sortedYears.forEach(year => {
    const data = byYear[year];
    if (data.missing.length > 0) {
      console.log(`\n${year} (${data.missing.length} missing):`);
      data.missing.forEach((ws, i) => {
        console.log(`  ${i + 1}. ${ws.slug}`);
        console.log(`     Topic: ${ws.topic} > ${ws.subtopic}`);
      });
    }
  });

  // Save detailed report
  const report = {
    generated: new Date().toISOString(),
    summary: {
      totalWorksheets: totalWS,
      totalTested: totalTested,
      coveragePercent: totalPct
    },
    byYear: {}
  };

  sortedYears.forEach(year => {
    report.byYear[year] = {
      total: byYear[year].total,
      tested: byYear[year].tested,
      missing: byYear[year].missing.map(w => w.slug)
    };
  });

  fs.writeFileSync('test-coverage-report.json', JSON.stringify(report, null, 2));
  console.log('\n\nDetailed report saved to: test-coverage-report.json');
}

main().catch(console.error);
