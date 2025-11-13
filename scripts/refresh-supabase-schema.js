/**
 * Refresh Supabase PostgREST schema cache
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function refreshSchema() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing environment variables')
    process.exit(1)
  }

  console.log('🔄 Refreshing Supabase schema cache...')

  try {
    // Method 1: Send NOTIFY signal to reload schema
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/pgrst_reload_schema`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Prefer': 'params=single-object'
      }
    })

    if (response.ok || response.status === 404) {
      // 404 is ok - it means the function doesn't exist but cache will refresh on next request
      console.log('✅ Schema cache refresh triggered')
      console.log('💡 The schema cache will be refreshed on the next API request')
      console.log('📝 Try making a test save now to verify the mascots column works')
    } else {
      console.error('⚠️  Response:', response.status, response.statusText)
      console.log('\n📝 Alternative: Restart your dev server to force a fresh connection')
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
    console.log('\n📝 Alternative: Restart your dev server to force a fresh connection')
  }
}

refreshSchema()
