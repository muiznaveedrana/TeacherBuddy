// Verification script for library setup
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function verify() {
  console.log('🔍 Verifying library setup...\n');

  // Check tables exist
  console.log('1️⃣ Checking tables...');
  const { data: worksheets, error: wsError } = await supabase
    .from('library_worksheets')
    .select('count')
    .limit(1);

  if (wsError) {
    console.error('❌ library_worksheets table error:', wsError.message);
    return;
  }
  console.log('✅ library_worksheets table exists');

  const { data: downloads, error: dlError } = await supabase
    .from('library_downloads')
    .select('count')
    .limit(1);

  if (dlError) {
    console.error('❌ library_downloads table error:', dlError.message);
    return;
  }
  console.log('✅ library_downloads table exists\n');

  // Check sample data
  console.log('2️⃣ Checking sample data...');
  const { data: allWorksheets, error: dataError, count } = await supabase
    .from('library_worksheets')
    .select('*', { count: 'exact' });

  if (dataError) {
    console.error('❌ Error fetching worksheets:', dataError.message);
    return;
  }

  console.log(`✅ Found ${count} worksheets\n`);

  // Show worksheet details
  console.log('📋 Worksheet Details:');
  allWorksheets.forEach((ws, i) => {
    console.log(`\n${i + 1}. ${ws.title}`);
    console.log(`   Slug: ${ws.slug}`);
    console.log(`   Region: ${ws.region}`);
    console.log(`   Year Group: ${ws.year_group}`);
    console.log(`   Topic: ${ws.topic}`);
    console.log(`   Subtopic: ${ws.subtopic}`);
    console.log(`   Layout: ${ws.layout_type}`);
    console.log(`   Theme: ${ws.visual_theme || 'N/A'}`);
    console.log(`   Activity: ${ws.activity_type || 'N/A'}`);
    console.log(`   Status: ${ws.status}`);
    console.log(`   Views: ${ws.view_count} | Downloads: ${ws.download_count}`);
  });

  // Check region distribution
  console.log('\n\n3️⃣ Region Distribution:');
  const regions = allWorksheets.reduce((acc, ws) => {
    acc[ws.region] = (acc[ws.region] || 0) + 1;
    return acc;
  }, {});

  Object.entries(regions).forEach(([region, count]) => {
    console.log(`   ${region}: ${count} worksheets`);
  });

  // Check year group distribution
  console.log('\n4️⃣ Year Group Distribution:');
  const yearGroups = allWorksheets.reduce((acc, ws) => {
    acc[ws.year_group] = (acc[ws.year_group] || 0) + 1;
    return acc;
  }, {});

  Object.entries(yearGroups).forEach(([yg, count]) => {
    console.log(`   ${yg}: ${count} worksheets`);
  });

  console.log('\n\n✅ Verification Complete!');
  console.log('🎉 Database setup successful - ready for Phase 2!');
}

verify();
