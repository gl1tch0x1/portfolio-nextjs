import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import type { Database } from '@/types/supabase'
import type { PostgrestError } from '@supabase/supabase-js'

type TableName = keyof Database['public']['Tables']
type TableRow<T extends TableName> = Database['public']['Tables'][T]['Row']

export function useSupabaseQuery<T extends TableName>(
  table: T,
  options?: {
    select?: string
    order?: { column: string; ascending?: boolean }
    limit?: number
    single?: boolean
  }
) {
  const [data, setData] = useState<TableRow<T>[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<PostgrestError | null>(null)
  const supabase = createClient()

  const fetchData = useCallback(async () => {
    if (!table) return
    
    setLoading(true)
    setError(null)

    try {
      const query = supabase
        .from(table)
        .select(options?.select || '*')
        .order(options?.order?.column || 'created_at', { 
          ascending: options?.order?.ascending ?? false 
        })

      if (options?.limit) {
        query.limit(options.limit)
      }

      const { data: result, error: queryError } = await query

      if (queryError) throw queryError

      setData(result || [])
    } catch (err) {
      const pgError = err as PostgrestError
      setError(pgError)
      setData([])
    } finally {
      setLoading(false)
    }
  }, [table, options, supabase])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    error,
    refetch: fetchData
  }
} 