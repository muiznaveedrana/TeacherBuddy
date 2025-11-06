require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

async function testLibrarySetup() {
  console.log('\n🔍 Testing Library Setup...\n')

  // 1. Check environment variables
  console.log('1️⃣ Checking environment variables:')
  const checks = {
    'NEXT_PUBLIC_SUPABASE_URL': !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    'NEXT_PUBLIC_SUPABASE_ANON_KEY': !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    'IMAGEKIT_PUBLIC_KEY': !!process.env.IMAGEKIT_PUBLIC_KEY,
    'IMAGEKIT_PRIVATE_KEY': !!process.env.IMAGEKIT_PRIVATE_KEY,
    'IMAGEKIT_URL_ENDPOINT': !!process.env.IMAGEKIT_URL_ENDPOINT,
  }

  Object.entries(checks).forEach(([key, value]) => {
    console.log(`   ${value ? '✅' : '❌'} ${key}`)
  })

  if (!checks['NEXT_PUBLIC_SUPABASE_URL'] || !checks['NEXT_PUBLIC_SUPABASE_ANON_KEY']) {
    console.error('\n❌ Supabase configuration missing!')
    process.exit(1)
  }

  // 2. Test Supabase connection
  console.log('\n2️⃣ Testing Supabase connection:')
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  try {
    const { data, error } = await supabase.from('library_worksheets').select('count').limit(1)
    if (error) throw error
    console.log('   ✅ Successfully connected to Supabase')
  } catch (error) {
    console.error('   ❌ Supabase connection failed:', error.message)
    process.exit(1)
  }

  // 3. Check if tables exist
  console.log('\n3️⃣ Checking database tables:')
  try {
    const { count: worksheetsCount, error: worksheetsError } = await supabase
      .from('library_worksheets')
      .select('*', { count: 'exact', head: true })

    if (worksheetsError) throw new Error(`library_worksheets: ${worksheetsError.message}`)
    console.log(`   ✅ library_worksheets table exists (${worksheetsCount} rows)`)

    const { count: downloadsCount, error: downloadsError } = await supabase
      .from('library_downloads')
      .select('*', { count: 'exact', head: true })

    if (downloadsError) throw new Error(`library_downloads: ${downloadsError.message}`)
    console.log(`   ✅ library_downloads table exists (${downloadsCount} rows)`)
  } catch (error) {
    console.error('   ❌ Table check failed:', error.message)
    console.log('\n💡 Tip: Run the database migration from Phase 1 first')
    process.exit(1)
  }

  // 4. Check for published worksheets
  console.log('\n4️⃣ Checking for published worksheets:')
  const { data: published, error: publishedError } = await supabase
    .from('library_worksheets')
    .select('id, slug, title, status')
    .eq('status', 'published')

  if (publishedError) {
    console.error('   ❌ Query failed:', publishedError.message)
  } else if (published.length === 0) {
    console.log('   ⚠️  No published worksheets found')
    console.log('   💡 You can manually publish one for testing:')
    console.log('      UPDATE library_worksheets SET status = \'published\', published_at = NOW() WHERE id = \'...\';')
  } else {
    console.log(`   ✅ Found ${published.length} published worksheet(s):`)
    published.forEach(w => {
      console.log(`      - ${w.title} (${w.slug})`)
    })
  }

  // 5. Check for draft worksheets
  console.log('\n5️⃣ Checking for draft worksheets:')
  const { data: drafts, error: draftsError } = await supabase
    .from('library_worksheets')
    .select('id, slug, title, status')
    .eq('status', 'draft')

  if (draftsError) {
    console.error('   ❌ Query failed:', draftsError.message)
  } else if (drafts.length === 0) {
    console.log('   ℹ️  No draft worksheets found')
  } else {
    console.log(`   ✅ Found ${drafts.length} draft worksheet(s):`)
    drafts.forEach(w => {
      console.log(`      - ${w.title} (${w.slug})`)
    })
  }

  console.log('\n✅ Library setup verification complete!\n')
}

testLibrarySetup().catch(error => {
  console.error('\n❌ Test failed:', error)
  process.exit(1)
})
