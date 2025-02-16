import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase credentials')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function main() {
  const adminEmail = process.argv[2]
  const adminPassword = process.argv[3]

  if (!adminEmail || !adminPassword) {
    console.error('Usage: npm run create-admin <email> <password>')
    process.exit(1)
  }

  try {
    // Create admin user
    const { data: { user }, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
    })

    if (authError) throw authError

    // Set admin role
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', user.id)

    if (updateError) throw updateError

    console.log('Admin user created successfully:', adminEmail)
  } catch (error) {
    console.error('Error creating admin user:', error)
  }
}

main() 