/**
 * MIGRATION SCRIPT: Normalize topic/subtopic values to match curriculum.ts
 *
 * This script updates existing library worksheets to use standardized
 * taxonomy values from curriculum.ts
 *
 * Run: node scripts/migrate-taxonomy.js
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials')
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

/**
 * Mapping of old values to new curriculum-based values
 */
const TOPIC_MAPPING = {
  // Already correct values (kebab-case from curriculum.ts)
  'number-place-value': 'number-place-value',
  'number-counting': 'number-counting',
  'addition-subtraction': 'addition-subtraction',
  'shape-space': 'shape-space',
  'geometry-shapes': 'geometry-shapes',

  // Old display name formats → new kebab-case
  'Number & Place Value': 'number-place-value',
  'Number & Counting': 'number-counting',
  'Addition & Subtraction': 'addition-subtraction',
  'Shape, Space & Measure': 'shape-space',
  'Geometry - Shapes': 'geometry-shapes',

  // Partial/shortened names → full curriculum names
  'Addition': 'addition-subtraction',
  'Subtraction': 'addition-subtraction',
  'Numbers': 'number-place-value',
  'Counting': 'number-counting',
  'Shapes': 'geometry-shapes',
}

const SUBTOPIC_MAPPING = {
  // Number & Place Value subtopics
  'counting-to-10': 'counting-to-10',
  'counting-to-20': 'counting-to-20',
  'counting-to-100': 'counting-to-100',
  'place-value': 'place-value',

  // Number & Counting (Reception)
  'number-recognition': 'number-recognition',
  'counting-objects': 'counting-objects',
  'comparing-numbers': 'comparing-numbers',

  // Addition & Subtraction
  'addition-within-10': 'addition-within-10',
  'addition-within-20': 'addition-within-20',
  'subtraction-within-10': 'subtraction-within-10',
  'subtraction-within-20': 'subtraction-within-20',

  // Shapes
  'basic-shapes': 'basic-shapes',
  '2d-shapes': '2d-shapes',
  '3d-shapes': '3d-shapes',
  'shape-properties': 'shape-properties',
}

async function migrateWorksheets() {
  console.log('🚀 Starting taxonomy migration...\n')

  // 1. Fetch all worksheets
  console.log('📊 Fetching existing worksheets...')
  const { data: worksheets, error: fetchError } = await supabase
    .from('library_worksheets')
    .select('id, title, topic, subtopic, year_group, status')
    .order('created_at', { ascending: true })

  if (fetchError) {
    console.error('❌ Failed to fetch worksheets:', fetchError)
    process.exit(1)
  }

  console.log(`✅ Found ${worksheets.length} worksheets\n`)

  if (worksheets.length === 0) {
    console.log('✅ No worksheets to migrate')
    return
  }

  // 2. Analyze and plan migrations
  console.log('📋 Migration plan:')
  console.log('─'.repeat(80))

  const updates = []

  for (const worksheet of worksheets) {
    const normalizedTopic = TOPIC_MAPPING[worksheet.topic] || worksheet.topic
    const normalizedSubtopic = SUBTOPIC_MAPPING[worksheet.subtopic] || worksheet.subtopic

    const needsUpdate = normalizedTopic !== worksheet.topic || normalizedSubtopic !== worksheet.subtopic

    if (needsUpdate) {
      updates.push({
        id: worksheet.id,
        title: worksheet.title,
        oldTopic: worksheet.topic,
        newTopic: normalizedTopic,
        oldSubtopic: worksheet.subtopic,
        newSubtopic: normalizedSubtopic,
      })

      console.log(`📝 ${worksheet.title}`)
      console.log(`   Status: ${worksheet.status}`)
      if (normalizedTopic !== worksheet.topic) {
        console.log(`   Topic: "${worksheet.topic}" → "${normalizedTopic}"`)
      }
      if (normalizedSubtopic !== worksheet.subtopic) {
        console.log(`   Subtopic: "${worksheet.subtopic}" → "${normalizedSubtopic}"`)
      }
      console.log('')
    } else {
      console.log(`✅ ${worksheet.title} - Already correct`)
    }
  }

  console.log('─'.repeat(80))
  console.log(`\n📊 Summary: ${updates.length} worksheets need updating\n`)

  if (updates.length === 0) {
    console.log('✅ All worksheets already use correct taxonomy values!')
    return
  }

  // 3. Confirm before proceeding
  console.log('⚠️  This will update the database. Continue? (Ctrl+C to cancel)')
  console.log('Waiting 5 seconds...\n')
  await new Promise(resolve => setTimeout(resolve, 5000))

  // 4. Apply migrations
  console.log('🔄 Applying migrations...\n')

  let successCount = 0
  let errorCount = 0

  for (const update of updates) {
    try {
      const { error } = await supabase
        .from('library_worksheets')
        .update({
          topic: update.newTopic,
          subtopic: update.newSubtopic
        })
        .eq('id', update.id)

      if (error) throw error

      console.log(`✅ Updated: ${update.title}`)
      successCount++

    } catch (error) {
      console.error(`❌ Failed to update ${update.title}:`, error.message)
      errorCount++
    }
  }

  // 5. Summary
  console.log('\n' + '─'.repeat(80))
  console.log('📊 Migration Results:')
  console.log(`   ✅ Success: ${successCount}`)
  console.log(`   ❌ Errors: ${errorCount}`)
  console.log(`   📝 Total: ${updates.length}`)
  console.log('─'.repeat(80))

  if (successCount > 0) {
    console.log('\n✅ Migration completed successfully!')
    console.log('All worksheets now use curriculum.ts taxonomy values')
  }

  if (errorCount > 0) {
    console.log('\n⚠️  Some migrations failed. Please check the errors above.')
    process.exit(1)
  }
}

// Run migration
migrateWorksheets()
  .then(() => {
    console.log('\n✅ Done!')
    process.exit(0)
  })
  .catch(error => {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  })
