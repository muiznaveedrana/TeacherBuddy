#!/usr/bin/env node
/**
 * Promote Worksheets to Production
 *
 * Workflow:
 * 1. Backup production database (safety net)
 * 2. Copy NEW worksheets from DEV → PROD (by slug)
 * 3. Skip worksheets that already exist in PROD
 *
 * Usage: npm run db:promote
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

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
  console.log('\n1. BACKING UP PRODUCTION...');

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

  console.log(`   Backed up ${data.length} worksheets to ${backupFolder}`);
  return backupFolder;
}

async function promote() {
  console.log('===========================================');
  console.log('  PROMOTE WORKSHEETS TO PRODUCTION');
  console.log('===========================================\n');

  // Verify we're reading from DEV
  if (DEV_URL.includes('iiatpmoracqxavcrvcrk')) {
    console.error('ERROR: .env.local is pointing to PRODUCTION!');
    console.error('Switch to DEV credentials first.');
    process.exit(1);
  }

  // Get worksheets from both databases
  console.log('Fetching worksheets...');

  const { data: devWorksheets, error: devError } = await devSupabase
    .from('library_worksheets')
    .select('*');

  const { data: prodWorksheets, error: prodError } = await prodSupabase
    .from('library_worksheets')
    .select('slug');

  if (devError || prodError) {
    console.error('Error fetching worksheets:', devError?.message || prodError?.message);
    process.exit(1);
  }

  const prodSlugs = new Set(prodWorksheets.map(w => w.slug));
  const newWorksheets = devWorksheets.filter(w => !prodSlugs.has(w.slug));

  console.log(`\nDEV database: ${devWorksheets.length} worksheets`);
  console.log(`PROD database: ${prodWorksheets.length} worksheets`);
  console.log(`NEW to promote: ${newWorksheets.length} worksheets\n`);

  if (newWorksheets.length === 0) {
    console.log('No new worksheets to promote. DEV and PROD are in sync!');
    return;
  }

  // Show what will be promoted
  console.log('Worksheets to promote:');
  newWorksheets.forEach((w, i) => {
    console.log(`  ${i + 1}. ${w.title} (${w.slug})`);
  });

  const confirmed = await confirm('\nProceed with promotion? (y/N): ');
  if (!confirmed) {
    console.log('Cancelled.');
    return;
  }

  // Backup production first
  const backupPath = await backupProduction();
  if (!backupPath) {
    console.error('Backup failed. Aborting promotion.');
    process.exit(1);
  }

  // Promote worksheets
  console.log('\n2. PROMOTING WORKSHEETS...');

  let success = 0;
  let failed = 0;

  for (const worksheet of newWorksheets) {
    // Remove id and timestamps - let PROD generate new ones
    const { id, created_at, updated_at, ...worksheetData } = worksheet;

    const { error } = await prodSupabase
      .from('library_worksheets')
      .insert(worksheetData);

    if (error) {
      console.log(`   Failed: ${worksheet.slug} - ${error.message}`);
      failed++;
    } else {
      console.log(`   Promoted: ${worksheet.title}`);
      success++;
    }
  }

  console.log('\n===========================================');
  console.log('  PROMOTION COMPLETE');
  console.log('===========================================');
  console.log(`  Promoted: ${success}`);
  console.log(`  Failed: ${failed}`);
  console.log(`  Backup: ${backupPath}`);
  console.log('===========================================\n');

  if (failed > 0) {
    console.log('Some worksheets failed. Check errors above.');
    console.log(`To rollback: npm run db:restore ${path.basename(backupPath)}`);
  }
}

// Run
promote().catch(err => {
  console.error('Promotion failed:', err.message);
  process.exit(1);
});
