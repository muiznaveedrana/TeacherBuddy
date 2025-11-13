/**
 * Quick backup of library_worksheets table via Supabase client
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

async function backupLibraryWorksheets() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing environment variables')
    process.exit(1)
  }

  console.log('📡 Connecting to Supabase...')
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  console.log('📥 Fetching library_worksheets data...')
  const { data: worksheets, error } = await supabase
    .from('library_worksheets')
    .select('*')

  if (error) {
    console.error('❌ Failed to fetch data:', error.message)
    process.exit(1)
  }

  console.log(`✅ Fetched ${worksheets.length} worksheets`)

  const backupDir = path.join(process.cwd(), 'supabase', 'backups')
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true })
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
  const backupFile = path.join(backupDir, `library_worksheets_${timestamp}.json`)

  fs.writeFileSync(backupFile, JSON.stringify(worksheets, null, 2))
  console.log(`✅ Backup saved to: ${backupFile}`)
  console.log(`📊 Backup size: ${(fs.statSync(backupFile).size / 1024 / 1024).toFixed(2)} MB`)
}

backupLibraryWorksheets().catch(console.error)
