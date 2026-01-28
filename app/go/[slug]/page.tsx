import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import CreepyRedirect from './CreepyRedirect'

export default async function GoPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  const { data, error } = await supabase
    .from('links')
    .select('original_url')
    .eq('slug', slug)
    .single()

  if (!data || error) notFound()

  return <CreepyRedirect url={data.original_url} />
}
