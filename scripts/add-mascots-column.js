/**
 * Add mascots column to library_worksheets table via Supabase API
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function addMascotsColumn() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing environment variables:')
    console.error('  NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗')
    console.error('  SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗')
    process.exit(1)
  }

  console.log('📡 Connecting to Supabase...')
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  console.log('🔧 Adding mascots column to library_worksheets table...')

  const sql = `
    ALTER TABLE library_worksheets
    ADD COLUMN IF NOT EXISTS mascots JSONB DEFAULT '[]'::jsonb;

    COMMENT ON COLUMN library_worksheets.mascots IS 'Array of mascot objects with positioning and styling info (id, src, x, y, width, height, rotation, opacity, zIndex, locked)';
  `

  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql })

    if (error) {
      // RPC function might not exist, try direct SQL execution
      console.log('⚠️ RPC method not available, trying alternative approach...')

      // Alternative: Use the PostgREST API directly
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`
        },
        body: JSON.stringify({ sql_query: sql })
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`)
      }

      console.log('✅ Column added successfully via direct API!')
    } else {
      console.log('✅ Column added successfully via RPC!')
    }

    // Verify the column was added
    console.log('🔍 Verifying column exists...')
    const { data: worksheets, error: verifyError } = await supabase
      .from('library_worksheets')
      .select('id, mascots')
      .limit(1)

    if (verifyError) {
      console.error('❌ Verification failed:', verifyError.message)
    } else {
      console.log('✅ Column verified! Sample record:', worksheets[0])
    }

  } catch (err) {
    console.error('❌ Failed to add column:', err.message)
    console.log('\n📝 Please run this SQL manually in Supabase Dashboard:')
    console.log('   https://supabase.com/dashboard/project/iiatpmoracqxavcrvcrk/sql/new')
    console.log('\n' + sql)
    process.exit(1)
  }
}

addMascotsColumn()
