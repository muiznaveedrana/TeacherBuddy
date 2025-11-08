#!/usr/bin/env node

/**
 * CLEAN LIBRARY - Delete all worksheets from the database
 * Use this to start with a clean slate for production-ready worksheets
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('   Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function cleanLibrary() {
  console.log('🗑️  CLEANING LIBRARY DATABASE\n');

  try {
    // Step 1: Count current worksheets
    const { count: totalCount, error: countError } = await supabase
      .from('library_worksheets')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      throw countError;
    }

    console.log(`📊 Current worksheets in library: ${totalCount}`);

    if (totalCount === 0) {
      console.log('\n✅ Library is already empty - nothing to clean!');
      return;
    }

    // Step 2: Get all worksheet IDs and slugs for confirmation
    const { data: worksheets, error: fetchError } = await supabase
      .from('library_worksheets')
      .select('id, slug, title, year_group, topic, subtopic, created_at')
      .order('created_at', { ascending: false });

    if (fetchError) {
      throw fetchError;
    }

    console.log('\n📋 Worksheets to be deleted:\n');
    worksheets.forEach((ws, idx) => {
      console.log(`   ${idx + 1}. ${ws.title || ws.slug}`);
      console.log(`      Year: ${ws.year_group}, Topic: ${ws.topic}, Subtopic: ${ws.subtopic}`);
      console.log(`      Created: ${new Date(ws.created_at).toLocaleString()}\n`);
    });

    // Step 3: Confirm deletion
    console.log(`\n⚠️  WARNING: This will DELETE ALL ${totalCount} worksheets from the library!`);
    console.log('   This action CANNOT be undone.\n');

    // Step 4: Delete all worksheets
    console.log('🗑️  Deleting all worksheets...\n');

    const { error: deleteError } = await supabase
      .from('library_worksheets')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all (dummy condition)

    if (deleteError) {
      throw deleteError;
    }

    // Step 5: Verify deletion
    const { count: remainingCount, error: verifyError } = await supabase
      .from('library_worksheets')
      .select('*', { count: 'exact', head: true });

    if (verifyError) {
      throw verifyError;
    }

    console.log(`✅ Library cleaned successfully!`);
    console.log(`   Deleted: ${totalCount} worksheets`);
    console.log(`   Remaining: ${remainingCount} worksheets\n`);

    if (remainingCount > 0) {
      console.log(`⚠️  Warning: ${remainingCount} worksheets still remain (possibly due to RLS policies)`);
    } else {
      console.log(`🎉 Library is now empty and ready for production-quality worksheets!\n`);
    }

  } catch (error) {
    console.error('\n❌ Error cleaning library:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// Run the cleanup
cleanLibrary();
