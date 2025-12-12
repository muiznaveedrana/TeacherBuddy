#!/usr/bin/env node
/**
 * Database Restore Script
 * Restores worksheet data from JSON backup files to Supabase
 *
 * Usage:
 *   node scripts/restore-database.js                    # Restore from latest backup
 *   node scripts/restore-database.js 2024-01-15T10-30  # Restore from specific backup
 *
 * ⚠️  WARNING: This will REPLACE existing data!
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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

async function restore(backupName = 'latest') {
  const backupFolder = path.join(BACKUP_DIR, backupName);

  if (!fs.existsSync(backupFolder)) {
    console.error(`❌ Backup not found: ${backupFolder}`);
    console.log('\nAvailable backups:');
    const backups = fs.readdirSync(BACKUP_DIR).filter(f =>
      fs.statSync(path.join(BACKUP_DIR, f)).isDirectory()
    );
    backups.forEach(b => console.log(`  - ${b}`));
    process.exit(1);
  }

  // Read manifest
  const manifestPath = path.join(backupFolder, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    console.error('❌ No manifest.json found in backup folder');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  console.log('===========================================');
  console.log('  SUPABASE DATABASE RESTORE');
  console.log('===========================================');
  console.log(`Backup: ${backupName}`);
  console.log(`Timestamp: ${manifest.timestamp}`);
  console.log(`Source URL: ${manifest.supabaseUrl}`);
  console.log(`Target URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);
  console.log('-------------------------------------------');
  console.log('Tables to restore:');
  manifest.tables.forEach(t => {
    console.log(`  - ${t.table}: ${t.count} records`);
  });
  console.log('-------------------------------------------\n');

  // Safety check - confirm URL match or warn
  if (manifest.supabaseUrl !== process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.log('⚠️  WARNING: Backup is from a DIFFERENT Supabase instance!');
    console.log(`   Backup source: ${manifest.supabaseUrl}`);
    console.log(`   Current target: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);
    console.log('');
  }

  const confirmed = await confirm('⚠️  This will REPLACE existing data. Continue? (y/N): ');
  if (!confirmed) {
    console.log('Restore cancelled.');
    process.exit(0);
  }

  console.log('\nStarting restore...\n');

  // Restore order matters for foreign keys
  const restoreOrder = ['profiles', 'library_worksheets', 'library_downloads'];

  for (const table of restoreOrder) {
    const tableInfo = manifest.tables.find(t => t.table === table);
    if (!tableInfo || tableInfo.status !== 'OK') {
      console.log(`Skipping ${table} (not in backup or had errors)`);
      continue;
    }

    const filePath = path.join(backupFolder, `${table}.json`);
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping ${table} (file not found)`);
      continue;
    }

    try {
      console.log(`Restoring: ${table}...`);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      if (data.length === 0) {
        console.log(`  ⏭️  Empty table, skipping`);
        continue;
      }

      // Delete existing data
      const { error: deleteError } = await supabase
        .from(table)
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Match all

      if (deleteError && !deleteError.message.includes('0 rows')) {
        console.log(`  ⚠️  Delete warning: ${deleteError.message}`);
      }

      // Insert backup data in batches of 100
      const batchSize = 100;
      let inserted = 0;

      for (let i = 0; i < data.length; i += batchSize) {
        const batch = data.slice(i, i + batchSize);
        const { error: insertError } = await supabase
          .from(table)
          .upsert(batch, { onConflict: 'id' });

        if (insertError) {
          console.log(`  ⚠️  Insert error at batch ${i}: ${insertError.message}`);
        } else {
          inserted += batch.length;
        }
      }

      console.log(`  ✅ ${inserted}/${data.length} records restored`);
    } catch (err) {
      console.log(`  ❌ Failed: ${err.message}`);
    }
  }

  console.log('\n-------------------------------------------');
  console.log('✅ Restore completed!');
  console.log('===========================================\n');
}

// Run if called directly
if (require.main === module) {
  const backupName = process.argv[2] || 'latest';

  restore(backupName)
    .then(() => process.exit(0))
    .catch(err => {
      console.error('❌ Restore failed:', err.message);
      process.exit(1);
    });
}

module.exports = { restore };
