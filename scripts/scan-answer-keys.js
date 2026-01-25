#!/usr/bin/env node
/**
 * Scan all answer keys for potential issues
 */

const { createClient } = require('@supabase/supabase-js');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function scanAnswerKeys() {
  const { data } = await db
    .from('library_worksheets')
    .select('slug, year_group, html_content')
    .eq('status', 'published');

  const issues = [];

  for (const w of data) {
    const akMatch = w.html_content.match(/<div class="answer-key[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    if (!akMatch) continue;

    const ak = akMatch[1];
    const problems = [];

    // Check for HTML entities
    if (ak.includes('&lt;') || ak.includes('&gt;')) problems.push('HTML entities (<>)');
    if (ak.includes('&amp;')) problems.push('HTML entity (&)');
    if (ak.includes('&nbsp;')) problems.push('Non-breaking spaces');
    if (ak.includes('&quot;')) problems.push('HTML quotes');

    // Check for confusing formats
    if (ak.match(/\d+\/\d+.*\d+\/\d+.*\d+\/\d+/) && !ak.includes(','))
      problems.push('Multiple fractions without separators');

    // Check for very long answer keys (might be verbose explanations)
    const textOnly = ak.replace(/<[^>]+>/g, '').trim();
    if (textOnly.length > 500) problems.push('Very long answer key (may have explanations)');

    // Check for parentheses explanations that might confuse parser
    if (ak.match(/\([^)]{20,}\)/)) problems.push('Long parenthetical explanations');

    if (problems.length > 0) {
      issues.push({ slug: w.slug, year_group: w.year_group, problems });
    }
  }

  console.log('=== ANSWER KEY SCAN RESULTS ===\n');
  console.log('Total worksheets scanned:', data.length);
  console.log('Issues found:', issues.length);
  console.log('');

  if (issues.length > 0) {
    // Group by issue type
    const byIssue = {};
    issues.forEach(i => {
      i.problems.forEach(p => {
        if (!byIssue[p]) byIssue[p] = [];
        byIssue[p].push(`${i.year_group}: ${i.slug}`);
      });
    });

    Object.keys(byIssue).forEach(issue => {
      console.log(`\n### ${issue} (${byIssue[issue].length} worksheets)`);
      byIssue[issue].forEach(w => console.log('  - ' + w));
    });
  } else {
    console.log('No issues found!');
  }
}

scanAnswerKeys().catch(err => {
  console.error('Scan failed:', err.message);
  process.exit(1);
});
