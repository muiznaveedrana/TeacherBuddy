#!/usr/bin/env node
/**
 * Sync specific worksheets from DEV to PROD
 * Used when answer keys are updated in DEV and need to be pushed to PROD
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load DEV credentials
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
const devUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const devKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Load PROD credentials
const prodEnvPath = path.join(__dirname, '..', '.env.prod');
const prodEnv = require('dotenv').parse(fs.readFileSync(prodEnvPath));
const prodUrl = prodEnv.NEXT_PUBLIC_SUPABASE_URL;
const prodKey = prodEnv.SUPABASE_SERVICE_ROLE_KEY;

const devDb = createClient(devUrl, devKey);
const prodDb = createClient(prodUrl, prodKey);

// Worksheets to sync (updated answer keys)
const SLUGS_TO_SYNC = [
  'fractions-recognising-fractions',
  'fractions-recognising-fractions-v2',
  'fractions-recognising-fractions-v3',
  'fractions-recognising-fractions-test'
];

async function syncWorksheets() {
  console.log('=== SYNCING UPDATED WORKSHEETS TO PROD ===\n');

  let success = 0;
  let failed = 0;

  for (const slug of SLUGS_TO_SYNC) {
    // Get DEV version
    const { data: devW, error: devErr } = await devDb
      .from('library_worksheets')
      .select('html_content')
      .eq('slug', slug)
      .single();

    if (devErr || !devW) {
      console.log('❌ ' + slug + ' - Not found in DEV');
      failed++;
      continue;
    }

    // Update PROD with DEV's html_content (which contains the fixed answer key)
    const { error: updateErr } = await prodDb
      .from('library_worksheets')
      .update({
        html_content: devW.html_content,
        updated_at: new Date().toISOString()
      })
      .eq('slug', slug);

    if (updateErr) {
      console.log('❌ ' + slug + ' - Update failed: ' + updateErr.message);
      failed++;
    } else {
      console.log('✅ ' + slug + ' - Synced to PROD');
      success++;
    }
  }

  console.log('\n=== SYNC COMPLETE ===');
  console.log('Success: ' + success);
  console.log('Failed: ' + failed);
}

syncWorksheets().catch(err => {
  console.error('Sync failed:', err.message);
  process.exit(1);
});
