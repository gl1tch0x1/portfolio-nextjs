import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types/supabase'

export const createClient = () => {
  const supabase = createClientComponentClient<Database>()
  
  // Add error interceptor
  supabase.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_OUT') {
      console.log('User signed out')
    }
  })

  return supabase
}