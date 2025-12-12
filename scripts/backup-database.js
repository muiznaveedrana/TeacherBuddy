#!/usr/bin/env node
/**
 * Database Backup Script
 * Exports all worksheet data from Supabase to JSON files
 *
 * Usage: node scripts/backup-database.js
 *
 * Run this BEFORE any risky database operations!
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const BACKUP_DIR = path.join(__dirname, '..', 'backups');

// Tables to backup (add more as needed)
const TABLES_TO_BACKUP = [
  'library_worksheets',
  'library_downloads',
  'profiles'
];

async function backup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFolder = path.join(BACKUP_DIR, timestamp);

  // Create backup directory
  if (!fs.existsSync(backupFolder)) {
    fs.mkdirSync(backupFolder, { recursive: true });
  }

  console.log('===========================================');
  console.log('  SUPABASE DATABASE BACKUP');
  console.log('===========================================');
  console.log(`Timestamp: ${timestamp}`);
  console.log(`Output: ${backupFolder}`);
  console.log('-------------------------------------------\n');

  let totalRecords = 0;
  const summary = [];

  for (const table of TABLES_TO_BACKUP) {
    try {
      console.log(`Backing up: ${table}...`);

      const { data, error } = await supabase
        .from(table)
        .select('*');

      if (error) {
        console.log(`  ⚠️  Error: ${error.message}`);
        summary.push({ table, count: 0, status: 'ERROR', error: error.message });
        continue;
      }

      const count = data ? data.length : 0;
      totalRecords += count;

      // Save to JSON file
      const filePath = path.join(backupFolder, `${table}.json`);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      const fileSizeKB = (fs.statSync(filePath).size / 1024).toFixed(2);
      console.log(`  ✅ ${count} records (${fileSizeKB} KB)`);

      summary.push({ table, count, status: 'OK', sizeKB: fileSizeKB });
    } catch (err) {
      console.log(`  ❌ Failed: ${err.message}`);
      summary.push({ table, count: 0, status: 'FAILED', error: err.message });
    }
  }

  // Create backup manifest
  const manifest = {
    timestamp,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    tables: summary,
    totalRecords
  };

  fs.writeFileSync(
    path.join(backupFolder, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  // Update latest symlink/copy
  const latestPath = path.join(BACKUP_DIR, 'latest');
  if (fs.existsSync(latestPath)) {
    fs.rmSync(latestPath, { recursive: true });
  }
  fs.cpSync(backupFolder, latestPath, { recursive: true });

  console.log('\n-------------------------------------------');
  console.log('BACKUP SUMMARY');
  console.log('-------------------------------------------');
  summary.forEach(s => {
    console.log(`  ${s.status === 'OK' ? '✅' : '❌'} ${s.table}: ${s.count} records`);
  });
  console.log('-------------------------------------------');
  console.log(`Total: ${totalRecords} records backed up`);
  console.log(`Location: ${backupFolder}`);
  console.log('===========================================\n');

  return { success: true, folder: backupFolder, totalRecords };
}

// Run if called directly
if (require.main === module) {
  backup()
    .then(result => {
      if (result.success) {
        console.log('✅ Backup completed successfully!');
        process.exit(0);
      }
    })
    .catch(err => {
      console.error('❌ Backup failed:', err.message);
      process.exit(1);
    });
}

module.exports = { backup };
