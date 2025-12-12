#!/usr/bin/env node
/**
 * Backup PRODUCTION Supabase Database
 *
 * Usage: node scripts/backup-prod-database.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Production database credentials
const PROD_URL = 'https://iiatpmoracqxavcrvcrk.supabase.co';
const PROD_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpYXRwbW9yYWNxeGF2Y3J2Y3JrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjIzMTM1MSwiZXhwIjoyMDcxODA3MzUxfQ.7zLzr9fy6lPEQPTUuzj_FWEADTPxDc_uAgWZWQFn0P0';

const prodSupabase = createClient(PROD_URL, PROD_KEY);

const BACKUP_DIR = path.join(__dirname, '..', 'backups');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupFolder = path.join(BACKUP_DIR, `prod-backup-${timestamp}`);

async function backupProd() {
  console.log('===========================================');
  console.log('  BACKING UP PRODUCTION DATABASE');
  console.log('===========================================\n');

  // Create backup folder
  if (!fs.existsSync(backupFolder)) {
    fs.mkdirSync(backupFolder, { recursive: true });
  }

  // Backup library_worksheets
  console.log('1. Backing up library_worksheets...');
  const { data: worksheets, error: wsError } = await prodSupabase
    .from('library_worksheets')
    .select('*');

  if (wsError) {
    console.error('   Error:', wsError.message);
  } else {
    fs.writeFileSync(
      path.join(backupFolder, 'library_worksheets.json'),
      JSON.stringify(worksheets, null, 2)
    );
    console.log(`   Saved ${worksheets.length} worksheets`);
  }

  // Backup library_downloads
  console.log('2. Backing up library_downloads...');
  const { data: downloads, error: dlError } = await prodSupabase
    .from('library_downloads')
    .select('*');

  if (dlError) {
    console.error('   Error:', dlError.message);
  } else {
    fs.writeFileSync(
      path.join(backupFolder, 'library_downloads.json'),
      JSON.stringify(downloads, null, 2)
    );
    console.log(`   Saved ${downloads?.length || 0} download records`);
  }

  // Backup profiles
  console.log('3. Backing up profiles...');
  const { data: profiles, error: profError } = await prodSupabase
    .from('profiles')
    .select('*');

  if (profError) {
    console.error('   Error:', profError.message);
  } else {
    fs.writeFileSync(
      path.join(backupFolder, 'profiles.json'),
      JSON.stringify(profiles, null, 2)
    );
    console.log(`   Saved ${profiles?.length || 0} profiles`);
  }

  // Create manifest
  const manifest = {
    timestamp: new Date().toISOString(),
    source: 'PRODUCTION',
    database_url: PROD_URL,
    tables: {
      library_worksheets: worksheets?.length || 0,
      library_downloads: downloads?.length || 0,
      profiles: profiles?.length || 0
    }
  };
  fs.writeFileSync(
    path.join(backupFolder, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  // Update 'latest-prod' folder
  const latestProdPath = path.join(BACKUP_DIR, 'latest-prod');
  if (fs.existsSync(latestProdPath)) {
    fs.rmSync(latestProdPath, { recursive: true });
  }
  fs.mkdirSync(latestProdPath, { recursive: true });

  // Copy files to latest-prod
  for (const file of fs.readdirSync(backupFolder)) {
    fs.copyFileSync(
      path.join(backupFolder, file),
      path.join(latestProdPath, file)
    );
  }

  console.log('\n===========================================');
  console.log('  BACKUP COMPLETE');
  console.log('===========================================');
  console.log(`  Location: ${backupFolder}`);
  console.log('  Latest: backups/latest-prod/');
  console.log('===========================================');
}

backupProd().catch(err => {
  console.error('Backup failed:', err.message);
  process.exit(1);
});
