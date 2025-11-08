/**
 * Grant Admin Role to User
 *
 * Usage: node grant-admin.js your-email@example.com
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Need service role key for admin operations
)

async function grantAdminRole(email) {
  try {
    console.log(`🔍 Searching for user: ${email}`)

    // Update profile to admin
    const { data, error } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('email', email)
      .select()

    if (error) {
      // Profile might not exist yet, let's check auth.users
      console.log('⚠️ Profile not found, checking auth.users...')

      // List all users (requires service role key)
      const { data: users, error: usersError } = await supabase.auth.admin.listUsers()

      if (usersError) {
        throw usersError
      }

      const user = users.users.find(u => u.email === email)

      if (!user) {
        throw new Error(`User not found: ${email}`)
      }

      console.log(`✅ Found user: ${user.id}`)
      console.log(`📧 Email: ${user.email}`)

      // Create profile if it doesn't exist
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: user.email,
          role: 'admin'
        })

      if (insertError) {
        throw insertError
      }

      console.log('✅ Admin role granted!')
      return
    }

    if (!data || data.length === 0) {
      throw new Error(`No profile found for: ${email}`)
    }

    console.log('✅ Admin role granted!')
    console.log('User:', data[0])

  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

// Get email from command line argument
const email = process.argv[2]

if (!email) {
  console.error('❌ Please provide an email address')
  console.log('Usage: node grant-admin.js your-email@example.com')
  process.exit(1)
}

grantAdminRole(email)
