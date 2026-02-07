#!/usr/bin/env node
/**
 * Promote Worksheets to Production
 *
 * Workflow:
 * 1. Compare DEV and PROD databases
 * 2. Show NEW worksheets (exist in DEV but not PROD)
 * 3. Show UPDATED worksheets (content changed in DEV)
 * 4. Ask for confirmation before each operation
 * 5. Backup production database before changes
 *
 * Usage: npm run db:promote
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const crypto = require('crypto');

// Load dev credentials from .env.local
require('dotenv').config({ path: '.env.local' });

// Dev database (from .env.local)
const DEV_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const DEV_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Production database (hardcoded for safety - never changes)
const PROD_URL = 'https://iiatpmoracqxavcrvcrk.supabase.co';
const PROD_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpYXRwbW9yYWNxeGF2Y3J2Y3JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyMzEzNTEsImV4cCI6MjA3MTgwNzM1MX0.OTmp0dJ-qqruydqIi8HsH2D11qm8BNVCSFtddcNdLUY';
const PROD_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpYXRwbW9yYWNxeGF2Y3J2Y3JrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjIzMTM1MSwiZXhwIjoyMDcxODA3MzUxfQ.7zLzr9fy6lPEQPTUuzj_FWEADTPxDc_uAgWZWQFn0P0';

const devSupabase = createClient(DEV_URL, DEV_KEY);
const prodSupabase = createClient(PROD_URL, PROD_KEY);

const BACKUP_DIR = path.join(__dirname, '..', 'backups');

// Helper to create content hash for comparison
function hashContent(worksheet) {
  const content = JSON.stringify({
    html_content: worksheet.html_content,
    thumbnail_url: worksheet.thumbnail_url
  });
  return crypto.createHash('md5').update(content).digest('hex');
}

async function confirm(message) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(resolve => {
    rl.question(message, answer => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

async function backupProduction() {
  console.log('\n📦 BACKING UP PRODUCTION...');

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFolder = path.join(BACKUP_DIR, `prod-backup-${timestamp}`);

  if (!fs.existsSync(backupFolder)) {
    fs.mkdirSync(backupFolder, { recursive: true });
  }

  const { data, error } = await prodSupabase
    .from('library_worksheets')
    .select('*');

  if (error) {
    console.error('   Failed to backup:', error.message);
    return null;
  }

  fs.writeFileSync(
    path.join(backupFolder, 'library_worksheets.json'),
    JSON.stringify(data, null, 2)
  );

  console.log(`   ✅ Backed up ${data.length} worksheets to ${backupFolder}`);
  return backupFolder;
}

async function promote() {
  console.log('===========================================');
  console.log('  PROMOTE WORKSHEETS TO PRODUCTION');
  console.log('===========================================\n');

  // Verify we're reading from DEV
  if (DEV_URL.includes('iiatpmoracqxavcrvcrk')) {
    console.error('❌ ERROR: .env.local is pointing to PRODUCTION!');
    console.error('Switch to DEV credentials first.');
    process.exit(1);
  }

  // Get worksheets from both databases
  console.log('🔍 Fetching worksheets from DEV and PROD...\n');

  const { data: devWorksheets, error: devError } = await devSupabase
    .from('library_worksheets')
    .select('*');

  const { data: prodWorksheets, error: prodError } = await prodSupabase
    .from('library_worksheets')
    .select('*');

  if (devError || prodError) {
    console.error('Error fetching worksheets:', devError?.message || prodError?.message);
    process.exit(1);
  }

  // Build lookup maps
  const prodBySlug = new Map(prodWorksheets.map(w => [w.slug, w]));
  const devBySlug = new Map(devWorksheets.map(w => [w.slug, w]));

  // Find NEW worksheets (in DEV but not in PROD)
  const newWorksheets = devWorksheets.filter(w => !prodBySlug.has(w.slug));

  // Find UPDATED worksheets (content changed)
  const updatedWorksheets = devWorksheets.filter(w => {
    const prodW = prodBySlug.get(w.slug);
    if (!prodW) return false; // It's new, not updated
    return hashContent(w) !== hashContent(prodW);
  });

  // Summary
  console.log('📊 COMPARISON SUMMARY');
  console.log('-------------------------------------------');
  console.log(`   DEV database:  ${devWorksheets.length} worksheets`);
  console.log(`   PROD database: ${prodWorksheets.length} worksheets`);
  console.log(`   NEW to add:    ${newWorksheets.length} worksheets`);
  console.log(`   UPDATED:       ${updatedWorksheets.length} worksheets`);
  console.log('-------------------------------------------\n');

  if (newWorksheets.length === 0 && updatedWorksheets.length === 0) {
    console.log('✅ No changes needed. DEV and PROD are in sync!\n');
    return;
  }

  let backupPath = null;

  // Handle NEW worksheets
  if (newWorksheets.length > 0) {
    console.log('📝 NEW WORKSHEETS TO ADD:');
    newWorksheets.forEach((w, i) => {
      console.log(`   ${i + 1}. ${w.slug} - ${w.title}`);
    });

    const confirmNew = await confirm(`\n➡️  Add ${newWorksheets.length} NEW worksheets to PROD? (y/N): `);

    if (confirmNew) {
      if (!backupPath) {
        backupPath = await backupProduction();
        if (!backupPath) {
          console.error('Backup failed. Aborting.');
          process.exit(1);
        }
      }

      console.log('\n📤 Adding new worksheets...');
      let success = 0, failed = 0;

      for (const worksheet of newWorksheets) {
        const { id, created_at, updated_at, ...worksheetData } = worksheet;
        const { error } = await prodSupabase
          .from('library_worksheets')
          .insert(worksheetData);

        if (error) {
          console.log(`   ❌ Failed: ${worksheet.slug} - ${error.message}`);
          failed++;
        } else {
          console.log(`   ✅ Added: ${worksheet.slug}`);
          success++;
        }
      }
      console.log(`   Result: ${success} added, ${failed} failed\n`);
    } else {
      console.log('   Skipped adding new worksheets.\n');
    }
  }

  // Handle UPDATED worksheets
  if (updatedWorksheets.length > 0) {
    console.log('🔄 UPDATED WORKSHEETS TO SYNC:');

    // Group by year group for easier review
    const byYearGroup = {};
    updatedWorksheets.forEach(w => {
      const yg = w.year_group || 'Unknown';
      if (!byYearGroup[yg]) byYearGroup[yg] = [];
      byYearGroup[yg].push(w);
    });

    Object.entries(byYearGroup).forEach(([yg, worksheets]) => {
      console.log(`\n   ${yg} (${worksheets.length} worksheets):`);
      worksheets.forEach(w => {
        console.log(`      - ${w.slug}`);
      });
    });

    const confirmUpdate = await confirm(`\n➡️  Update ${updatedWorksheets.length} worksheets in PROD? (y/N): `);

    if (confirmUpdate) {
      if (!backupPath) {
        backupPath = await backupProduction();
        if (!backupPath) {
          console.error('Backup failed. Aborting.');
          process.exit(1);
        }
      }

      console.log('\n📤 Updating worksheets...');
      let success = 0, failed = 0;

      for (const worksheet of updatedWorksheets) {
        const { error } = await prodSupabase
          .from('library_worksheets')
          .update({
            html_content: worksheet.html_content,
            thumbnail_url: worksheet.thumbnail_url,
            updated_at: new Date().toISOString()
          })
          .eq('slug', worksheet.slug);

        if (error) {
          console.log(`   ❌ Failed: ${worksheet.slug} - ${error.message}`);
          failed++;
        } else {
          console.log(`   ✅ Updated: ${worksheet.slug}`);
          success++;
        }
      }
      console.log(`   Result: ${success} updated, ${failed} failed\n`);
    } else {
      console.log('   Skipped updating worksheets.\n');
    }
  }

  // Final summary
  console.log('===========================================');
  console.log('  PROMOTION COMPLETE');
  console.log('===========================================');
  if (backupPath) {
    console.log(`  Backup: ${backupPath}`);
    console.log(`  Rollback: npm run db:restore ${path.basename(backupPath)}`);
  }
  console.log('===========================================\n');
}

// Run
promote().catch(err => {
  console.error('Promotion failed:', err.message);
  process.exit(1);
});
